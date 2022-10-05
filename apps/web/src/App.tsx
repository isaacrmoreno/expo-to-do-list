import appleBadge from './assets/apple-badge-dark.png'
import googleBadge from './assets/google-play-badge.png'
import starRating from './assets/star-rating.png'
import quailPreview from './assets/quail-preview.png'
import Review from './components/Review'

function App() {
  return (
    <>
      <div className='h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-col'>
        <a
          className='absolute text-2xl text-white font-bold left-4 top-4'
          href='https://github.com/isaacrmoreno/expo-to-do-list'>
          Github
        </a>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex flex-col justify-center items-center text-center'>
            <h1 className='text-6xl font-bold text-white pb-4'>Download Quail Today</h1>
            <p className='text-xl font-bold text-white px-10 pb-6'>
              No bells or unnecessary whistles. - Just enough to help get things done, without the distraction.
            </p>
            <div className='flex flex-row justify-center'>
              <a
                className='mx-4 hover:scale-105 ease-in-out duration-300'
                href='https://apps.apple.com/us/app/quail-to-do-list/id1630267516'>
                <img src={appleBadge} alt='Apple App Store Badge' width={250} height={200} />
              </a>
              <a
                className='mx-4 hover:scale-105 ease-in-out duration-300'
                href='https://play.google.com/store/apps/details?id=com.expotodolist.prod'>
                <img src={googleBadge} alt='Google Play Store Badge' width={250} height={250} />
              </a>
            </div>
          </div>
          <img
            src={quailPreview}
            alt='Quail App Preview'
            width={450}
            height={450}
            className='justify-center hidden lg:flex'
          />
        </div>
      </div>
      <div className='h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-col py-28'>
        <p className='text-6xl text-white font-bold'>REVIEWS</p>
        <img src={starRating} alt='4.5 Star Rating' width={300} height={300} className='pt-6 pb-10' />
        <Review />
      </div>
    </>
  )
}

export default App
