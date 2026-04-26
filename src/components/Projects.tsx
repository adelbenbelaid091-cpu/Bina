'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, ChevronRight, ChevronDown, Calendar, CheckCircle2, Clock, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useApp } from '@/contexts/AppContext'
import { toast } from '@/hooks/use-toast'

interface Floor {
  id: string
  floorNumber: number
  reinforcement: {
    status: 'not_started' | 'in_progress' | 'completed'
    dateTime: string | null
    notes: string
  }
  concrete: {
    status: 'not_started' | 'in_progress' | 'completed'
    dateTime: string | null
    notes: string
  }
}

interface Project {
  id: string
  name: string
  description: string
  floorsCount: number
  floors: Floor[]
}

export function Projects() {
  const { t } = useApp()
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Residential Tower A',
      description: '12-story residential building with parking',
      floorsCount: 12,
      floors: Array.from({ length: 12 }, (_, i) => ({
        id: `f-${i}`,
        floorNumber: i + 1,
        reinforcement: { status: 'completed', dateTime: '2024-01-15T10:00', notes: 'Standard reinforcement completed' },
        concrete: { status: 'in_progress', dateTime: '2024-01-16T08:00', notes: 'Pouring in progress' },
      })),
    },
    {
      id: '2',
      name: 'Commercial Complex B',
      description: '8-story commercial complex',
      floorsCount: 8,
      floors: Array.from({ length: 8 }, (_, i) => ({
        id: `f-${i}`,
        floorNumber: i + 1,
        reinforcement: { status: i < 4 ? 'completed' : 'not_started', dateTime: i < 4 ? '2024-01-10T14:00' : null, notes: '' },
        concrete: { status: i < 3 ? 'completed' : 'not_started', dateTime: i < 3 ? '2024-01-12T09:00' : null, notes: '' },
      })),
    },
  ])

  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editFloorDialog, setEditFloorDialog] = useState<{ projectId: string; floor: Floor; type: 'reinforcement' | 'concrete' } | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    floorsCount: 5,
  })

  const [floorFormData, setFloorFormData] = useState({
    status: 'not_started' as 'not_started' | 'in_progress' | 'completed',
    dateTime: '',
    notes: '',
  })

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      floorsCount: formData.floorsCount,
      floors: Array.from({ length: formData.floorsCount }, (_, i) => ({
        id: `f-${Date.now()}-${i}`,
        floorNumber: i + 1,
        reinforcement: { status: 'not_started', dateTime: null, notes: '' },
        concrete: { status: 'not_started', dateTime: null, notes: '' },
      })),
    }

    setProjects([...projects, newProject])
    setShowCreateDialog(false)
    setFormData({ name: '', description: '', floorsCount: 5 })
    toast({
      title: t('success'),
      description: 'Project created successfully',
    })
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
    toast({
      title: t('success'),
      description: 'Project deleted successfully',
    })
  }

  const handleSaveFloor = () => {
    if (!editFloorDialog) return

    const { projectId, floor, type } = editFloorDialog

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          floors: project.floors.map(f => {
            if (f.id === floor.id) {
              return {
                ...f,
                [type]: floorFormData,
              }
            }
            return f
          }),
        }
      }
      return project
    }))

    setEditFloorDialog(null)
    setFloorFormData({ status: 'not_started', dateTime: '', notes: '' })
    toast({
      title: t('success'),
      description: 'Floor updated successfully',
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">{t('completed')}</Badge>
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">{t('inProgress')}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t('notStarted')}</Badge>
    }
  }

  const calculateProgress = (floors: Floor[]) => {
    if (floors.length === 0) return 0
    const totalTasks = floors.length * 2
    const completedTasks = floors.filter(
      f => f.reinforcement.status === 'completed' && f.concrete.status === 'completed'
    ).length * 2
    return Math.round((completedTasks / totalTasks) * 100)
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('projects')}</h1>
          <p className="text-muted-foreground mt-1">Manage your construction projects</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
          <Plus className="w-5 h-5" />
          {t('createProject')}
        </Button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const progress = calculateProgress(project.floors)
          const isExpanded = expandedProject === project.id

          return (
            <Card key={project.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => setExpandedProject(isExpanded ? null : project.id)}>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant="outline">{project.floorsCount} floors</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 max-w-[200px] h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{progress}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setExpandedProject(isExpanded ? null : project.id)}>
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setEditingProject(project)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {t('floorManagement')}
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {project.floors.map((floor) => (
                        <div key={floor.id} className="border border-border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground">{t('floor')} {floor.floorNumber}</h3>
                          </div>

                          {/* Reinforcement */}
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(floor.reinforcement.status)}
                              <div>
                                <p className="text-sm font-medium text-foreground">{t('reinforcement')}</p>
                                <p className="text-xs text-muted-foreground">
                                  {floor.reinforcement.dateTime ? new Date(floor.reinforcement.dateTime).toLocaleString() : t('notStarted')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(floor.reinforcement.status)}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditFloorDialog({
                                    projectId: project.id,
                                    floor,
                                    type: 'reinforcement',
                                  })
                                  setFloorFormData({
                                    status: floor.reinforcement.status,
                                    dateTime: floor.reinforcement.dateTime || '',
                                    notes: floor.reinforcement.notes,
                                  })
                                }}
                              >
                                {t('edit')}
                              </Button>
                            </div>
                          </div>

                          {/* Concrete */}
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(floor.concrete.status)}
                              <div>
                                <p className="text-sm font-medium text-foreground">{t('concretePouring')}</p>
                                <p className="text-xs text-muted-foreground">
                                  {floor.concrete.dateTime ? new Date(floor.concrete.dateTime).toLocaleString() : t('notStarted')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(floor.concrete.status)}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditFloorDialog({
                                    projectId: project.id,
                                    floor,
                                    type: 'concrete',
                                  })
                                  setFloorFormData({
                                    status: floor.concrete.status,
                                    dateTime: floor.concrete.dateTime || '',
                                    notes: floor.concrete.notes,
                                  })
                                }}
                              >
                                {t('edit')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Create Project Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('createProject')}</DialogTitle>
            <DialogDescription>Create a new construction project</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('projectName')}</Label>
              <Input
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('description')}</Label>
              <Textarea
                placeholder="Enter project description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('numberOfFloors')}</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={formData.floorsCount}
                onChange={(e) => setFormData({ ...formData, floorsCount: parseInt(e.target.value) || 5 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleCreateProject}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Floor Dialog */}
      <Dialog open={!!editFloorDialog} onOpenChange={() => setEditFloorDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t('edit')} - {editFloorDialog?.floor.floorNumber} - {editFloorDialog?.type === 'reinforcement' ? t('reinforcement') : t('concretePouring')}
            </DialogTitle>
            <DialogDescription>Update floor activity status</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t('status')}</Label>
              <Select
                value={floorFormData.status}
                onValueChange={(value: any) => setFloorFormData({ ...floorFormData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">{t('notStarted')}</SelectItem>
                  <SelectItem value="in_progress">{t('inProgress')}</SelectItem>
                  <SelectItem value="completed">{t('completed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('dateAndTime')}</Label>
              <Input
                type="datetime-local"
                value={floorFormData.dateTime}
                onChange={(e) => setFloorFormData({ ...floorFormData, dateTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('notes')}</Label>
              <Textarea
                placeholder="Add notes..."
                value={floorFormData.notes}
                onChange={(e) => setFloorFormData({ ...floorFormData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditFloorDialog(null)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSaveFloor}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
