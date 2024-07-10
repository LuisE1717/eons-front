import { userProfile, type UserProfile } from "../UserStore";

export function setUserProfile (user:UserProfile) {
  userProfile.set(user)

  // Convertir el objeto a JSON
  const userJson = JSON.stringify(user);
  
  // Guardar el objeto en localStorage
  localStorage.setItem('userJson', userJson);
}