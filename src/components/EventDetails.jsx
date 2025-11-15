import ListSection from './ListSection'

function EventDetails() {
  const events = [
    {
      icon: '/images/quake.png',
      name: 'Saturday, December 13th',
      status: '7:00 PM - Late'
    },
    {
      icon: '/images/cs1.6.png',
      name: 'Friendship Ave',
      status: 'Basement Arena'
    },
    {
      icon: '/images/aoe.png',
      name: 'Bring Your Rig',
      status: 'CS 1.6, Quake, UT2004'
    }
  ]

  return (
    <ListSection title="Event Details" items={events} />
  )
}

export default EventDetails
