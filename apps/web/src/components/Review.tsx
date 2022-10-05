import { ReviewProps } from '../type'

const Review: React.FC<ReviewProps> = ({ headline, username, review }) => {
  return (
    <div className='flex flex-col border rounded-lg p-6'>
      <div className='flex flex-row'>
        <p className='flex-1 font-bold text-white'>{headline}</p>
        <p className='text-right text-white'>{username}</p>
      </div>
      <p className='flex flex-col py-2 text-white mt-4'>{review}</p>
    </div>
  )
}

export default Review
