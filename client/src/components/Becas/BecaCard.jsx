import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const BecaCard = ({ beca }) => {
  return (
    <div className='rounded-lg shadow-lg'>
      <img
        className='rounded-t-lg'
        src={beca.image}
        alt=''
      />
      <div className='p-5'>
        <h2 className='text-2xl text-slate-700 mb-3 font-bold'>{beca.title}</h2>
        <p className='text-lg font-normal mb-3 text-gray-600'>
          {beca.description}
        </p>
        <p className='text-lg font-normal mb-3 text-gray-700'>
          {dayjs(beca.date).utc().format('DD/MM/YYYY')}
        </p>
      </div>
    </div>
  );
};

export default BecaCard;
