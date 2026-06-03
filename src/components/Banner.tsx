import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

const Banner = ({ title }: { title: string }) => {
  const user = useAuthState();

  return (
    <div className="flex w-full items-center justify-between bg-[#282c34] px-4 py-3 text-white">
      <h1 className="text-xl font-semibold">{title}</h1>
      <span>
        {user ? (
          <>
            <span className="mr-3 text-sm">Hi, {user.displayName ?? "user"}</span>
            <button onClick={signOut} className="rounded bg-white/10 px-3 py-1">Sign Out</button>
          </>
        ) : (
          <button onClick={signInWithGoogle} className="rounded bg-white/10 px-3 py-1">Sign In</button>
        )}
      </span>
    </div>
  );
};

export default Banner;