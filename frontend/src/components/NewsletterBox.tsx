export default function NewsletterBox() {
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-700">Subcribe now and get 20% off</p>
      <p className="text-gray-400 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border" onSubmit={onSubmitHandler}>
        <input className="w-full sm:flex-1 outline-none" placeholder="Enter your email" type="email" name="email" />
        <button className="bg-black text-white text-xs px-10 py-4" type="submit">
          SUBCRIBE
        </button>
      </form>
    </div>
  );
}
