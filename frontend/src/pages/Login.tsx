import React, { useState } from 'react';

export default function Login() {
  const [State, setState] = useState('Sign Up');

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{State}</p>

        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Username"
        autoFocus
        required
      />
      <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />
      {State === 'Sign Up' ? (
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Confirm Password"
          required
        />
      ) : null}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:underline">Forgot password?</p>

        {State === 'Login' ? (
          <p onClick={() => setState('Sign Up')} className="cursor-pointer hover:underline">
            Create account
          </p>
        ) : (
          <p onClick={() => setState('Login')} className="cursor-pointer hover:underline">
            Login here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">{State}</button>
    </form>
  );
}
