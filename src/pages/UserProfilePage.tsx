//6
// import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

// const UserProfilePage = () => {

//   return (
//     <UserProfileForm/>
//   );
// };

// export default UserProfilePage;





//11
// import {  useUpdateMyUser } from "@/api/MyUserApi";
// import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

// const UserProfilePage = () => {
//   const { updateUser, isLoading } = useUpdateMyUser();

//   return (
//     <UserProfileForm
//       onSave={updateUser}
//       isLoading={isLoading}
//     />
//   );
// };

// export default UserProfilePage;





//12
// import {  useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
// import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

// const UserProfilePage = () => {
//   const { currentUser, isLoading: isGetLoading } = useGetMyUser();
//   const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
//   if (isGetLoading) {
//     return <span>Loading...</span>;
//   }

//   return (
//     <UserProfileForm
//       onSave={updateUser}
//       isLoading={isUpdateLoading}
//     />
//   );
// };

// export default UserProfilePage;







import {  useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  } 

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;