import appleBadge from './assets/apple-badge-dark.png'
import googleBadge from './assets/google-play-badge.png'

function App() {
  return (
    <div className='h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-col'>
      <div className='text-center my-52'>
        <h1 className='text-6xl font-bold text-white pb-4'>Download Quail today</h1>
        <h3 className='text-3xl font-bold text-white'>A minimalist's to do list</h3>
      </div>

      <div className='flex flex-row'>
        <a className='mx-4' href='https://apps.apple.com/us/app/quail-to-do-list/id1630267516'>
          <img src={appleBadge} alt='Apple App Store Badge' width={250} height={200} />
        </a>
        <a
          className='mx-4'
          href='https://play.google.com/store/apps/details?id=com.expotodolist.prod'>
          <img src={googleBadge} alt='Google Play Store Badge' width={250} height={250} />
        </a>
      </div>
    </div>
  )
}

export default App
