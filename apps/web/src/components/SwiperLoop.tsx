import Swiper from 'react-id-swiper'
import Review from './Review'

const SwiperLoop = () => {
  const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  }

  let reviews = [
    {
      username: 'Cleo0413',
      headline: 'THE BEST',
      review:
        "I struggle with finding the right tool as a to-do list. I've used notes, reminders app, daily planners and the traditional pen to paper list. This is by far the best thing i've encountered and so happy it has been created. Super easy to use and gets straight to the point. I was blown away with how something so simple was exactly what I needed.",
    },
    {
      username: 'Anssorry',
      headline: 'Love it',
      review:
        "I've been looking to get an app that helps me organize my daily task, and this App is just what I needed. It's so simple, easy to use and doesn't use much space on my phone.",
    },
    {
      username: 'BrickThicket',
      headline: 'Most Straightforward To Do List',
      review:
        "Quail is as easy as it gets to use. No sign in, no extra features just a simple to do list. Plus their aren't any annoying ads or pop ups to subscribe. More apps need to adopt this minimal aesthetic and not bombard users with gimmicky features. Quail is my go to to do list app from now on 🤘",
    },
  ]

  return (
    <div className='flex items-center w-10/12 lg:w-6/12'>
      <Swiper {...params}>
        <div>
          <Review headline={reviews[0]?.headline} username={reviews[0]?.username} review={reviews[0]?.review} />
        </div>
        <div>
          <Review headline={reviews[1]?.headline} username={reviews[1]?.username} review={reviews[1]?.review} />
        </div>
        <div>
          <Review headline={reviews[2]?.headline} username={reviews[2]?.username} review={reviews[2]?.review} />
        </div>
      </Swiper>
    </div>
  )
}

export default SwiperLoop
