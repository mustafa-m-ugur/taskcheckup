import client from './client';

//login api
const login = userData => client.post('login', userData);

//home api
const getHome = () => client.get('home');

//account api
const account = () => client.get('account');
const updateAccount = (updateData) => client.post('account-update', updateData);

//task api
const getTask = (params) => client.get('tasks' + ('?status=' + params.status_id + '&employee_id=' + params.employee_id + '&project_id=' + params.project_id + '&priority=' + params.priority_id + '&end_date=' + params.end_date));
const getTaskDetail = (id) => client.get('tasks/' + id);
const updateTask = (id, taskData) => client.post('tasks/' + id, taskData);
const createTask = (taskData) => client.post('tasks', taskData);
const getTimeTracking = (params) => client.get('tasks_time_tracking' + ('?employee_id=' + params.employee_id + '&project_id=' + params.project_id + '&start_date=' + params.start_date + '&end_date=' + params.end_date));

//other api
const getStatus = () => client.get('statuses');
const getPriority = () => client.get('priorities');
const getSelectProject = () => client.get('select_projects');
const getSelectEmployee = () => client.get('select_employees');

//employee api
const getEmployee = () => client.get('employees');
const updateEmployee = (id, employeeData) => client.post('employees/' + id, employeeData);
const getEmployeeDetail = (id) => client.get('employees/' + id);

//project api
const getProject = (params) => client.get('projects' + ('?status=' + params.status_id));
const updateProject = (id, projectData) => client.post('projects/' + id, projectData);
const getProjectDetail = (id) => client.get('projects/' + id);

//note api
const getNote = () => client.get('notes');
const getNoteDetail = (id) => client.get('notes/' + id);
const createNote = (noteData) => client.post('notes', noteData);
const updateNote = (id, noteData) => client.post('notes/' + id, noteData);

//notification api
const getNotification = () => client.get('notifications');
const notificationUpdate = () => client.get('notification-update');

export default {
    login,
    getHome,
    getTask,
    getTaskDetail,
    updateTask,
    createTask,
    getTimeTracking,
    getStatus,
    getPriority,
    getEmployee,
    getProject,
    getProjectDetail,
    updateProject,
    account,
    updateAccount,
    getNote,
    getNoteDetail,
    createNote,
    updateNote,
    getEmployeeDetail,
    getSelectProject,
    getSelectEmployee,
    updateEmployee,
    getNotification,
    notificationUpdate
};
