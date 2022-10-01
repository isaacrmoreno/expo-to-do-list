const Review = () => {
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
    <div className='flex flex-col lg:flex-row py-2 items-center banner'>
      {reviews.map((review, index) => {
        return (
          <div key={index} className='rounded-xl px-8 py-4 mx-8 my-4 w-10/12 border'>
            <div className='flex flex-row w-full'>
              <p className='flex-1 font-bold text-white'>{review?.headline}</p>
              <p className='text-right text-white'>{review?.username}</p>
            </div>
            <p className='flex flex-wrap py-2 text-white'>{review?.review}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Review
