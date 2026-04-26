export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    projects: 'Projects',
    reports: 'Reports',
    settings: 'Settings',

    // Dashboard
    totalProjects: 'Total Projects',
    recentActivities: 'Recent Activities',
    addProject: 'Add Project',
    viewReports: 'Reports',
    dailyUpdate: 'Daily Update',
    noProjects: 'No projects yet',
    createFirstProject: 'Create your first project',

    // Projects
    createProject: 'Create Project',
    editProject: 'Edit Project',
    deleteProject: 'Delete Project',
    projectName: 'Project Name',
    description: 'Description',
    numberOfFloors: 'Number of Floors',
    floorManagement: 'Floor Management',
    addFloor: 'Add Floor',
    floor: 'Floor',
    reinforcement: 'Reinforcement',
    concretePouring: 'Concrete Pouring',
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    completed: 'Completed',
    status: 'Status',
    dateAndTime: 'Date & Time',
    notes: 'Notes',
    save: 'Save',
    cancel: 'Cancel',

    // CET & CES
    cetTracking: 'CET Tracking',
    cesTracking: 'CES Tracking',
    addTask: 'Add Task',
    progress: 'Progress',
    technicalWorks: 'Technical Works',
    secondaryWorks: 'Secondary Works',

    // Reports
    pvVisite: 'PV de Visite',
    pvConstat: 'PV de Constat',
    createReport: 'Create Report',
    reportTitle: 'Report Title',
    reportDescription: 'Description',
    exportPDF: 'Export PDF',
    shareWhatsApp: 'Share via WhatsApp',
    shareEmail: 'Share via Email',
    copyReport: 'Copy Report',

    // Settings
    language: 'Language',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    enableNotifications: 'Enable Notifications',

    // General
    search: 'Search',
    filter: 'Filter',
    share: 'Share',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    close: 'Close',
    confirm: 'Confirm',
    noData: 'No data available',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    projects: 'Projets',
    reports: 'Rapports',
    settings: 'Paramètres',

    // Dashboard
    totalProjects: 'Total des projets',
    recentActivities: 'Activités récentes',
    addProject: 'Ajouter projet',
    viewReports: 'Rapports',
    dailyUpdate: 'Mise à jour quotidienne',
    noProjects: 'Aucun projet pour le moment',
    createFirstProject: 'Créez votre premier projet',

    // Projects
    createProject: 'Créer un projet',
    editProject: 'Modifier le projet',
    deleteProject: 'Supprimer le projet',
    projectName: 'Nom du projet',
    description: 'Description',
    numberOfFloors: 'Nombre d\'étages',
    floorManagement: 'Gestion des étages',
    addFloor: 'Ajouter un étage',
    floor: 'Étage',
    reinforcement: 'Ferraillage',
    concretePouring: 'Bétonnage',
    notStarted: 'Non commencé',
    inProgress: 'En cours',
    completed: 'Terminé',
    status: 'Statut',
    dateAndTime: 'Date & Heure',
    notes: 'Notes',
    save: 'Enregistrer',
    cancel: 'Annuler',

    // CET & CES
    cetTracking: 'Suivi CET',
    cesTracking: 'Suivi CES',
    addTask: 'Ajouter une tâche',
    progress: 'Progression',
    technicalWorks: 'Travaux techniques',
    secondaryWorks: 'Travaux secondaires',

    // Reports
    pvVisite: 'PV de Visite',
    pvConstat: 'PV de Constat',
    createReport: 'Créer un rapport',
    reportTitle: 'Titre du rapport',
    reportDescription: 'Description',
    exportPDF: 'Exporter PDF',
    shareWhatsApp: 'Partager via WhatsApp',
    shareEmail: 'Partager par Email',
    copyReport: 'Copier le rapport',

    // Settings
    language: 'Langue',
    theme: 'Thème',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    notifications: 'Notifications',
    enableNotifications: 'Activer les notifications',

    // General
    search: 'Rechercher',
    filter: 'Filtrer',
    share: 'Partager',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    close: 'Fermer',
    confirm: 'Confirmer',
    noData: 'Aucune donnée disponible',
    loading: 'Chargement...',
    success: 'Succès',
    error: 'Erreur',
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
