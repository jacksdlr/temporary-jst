export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user;
};

export const addWorkoutToLocalStorage = (workout) => {
  localStorage.setItem('workout', JSON.stringify(workout));
};

export const removeWorkoutFromLocalStorage = () => {
  localStorage.removeItem('workout');
};

export const getWorkoutFromLocalStorage = () => {
  const storedWorkout = localStorage.getItem('workout');
  const workout = storedWorkout ? JSON.parse(storedWorkout) : null;
  return workout;
};
