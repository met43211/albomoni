import { ContactForm } from '@albomoni/widgets/contact-form';

export const ContactTeam = () => {
  return (
    <div className='w-full h-min flex flex-col gap-10 mt-6'>
      <h2 className='text-2xl font-bold'>Связаться с командой</h2>
      <p className='font-medium opacity-50 -mt-6'>
        Нашли баг? Есть предложение? Дайте нам знать!
      </p>
      <ContactForm />
    </div>
  );
};
