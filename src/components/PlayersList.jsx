import ListSection from './ListSection'

function PlayersList() {
  const players = [
    {
      icon: '/images/player-icon.png',
      name: 'xXSniperXx',
      status: 'Bringing Pizza',
      online: true
    },
    {
      icon: '/images/player-icon.png',
      name: 'FragMaster2000',
      status: 'Got the energy drinks',
      online: true
    }
  ]

  return (
    <ListSection title="Players Confirmed" items={players} />
  )
}

export default PlayersList
