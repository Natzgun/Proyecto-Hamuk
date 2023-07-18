import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div
      data-name='profile'
      className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
    >
      <div className='bg-slate-100 shadow-lg max-w-md w-full p-10'>
        <h2 className='text-5xl mb-3 text-center text-slate-500'>Perfil</h2>
        <p className="text-slate-600 text-2xl">Nombre de usuario: {user.username}</p>
        <p className="text-slate-600 text-2xl">Correo: {user.email}</p>
        <p className="text-slate-600 text-2xl">Carrera: {user.career}</p>
      </div>
    </div>
  );
};

export default Profile;
