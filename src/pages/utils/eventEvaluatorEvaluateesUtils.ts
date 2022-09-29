import EventsApi from '../../api/events'

const getEventEvaluatorEvaluateesList = async (item: {
  id: number
  userName: string
  eventId?: number
}) => {
  const data = await EventsApi.getEventEvaluatorEvaluatees(item.eventId, item.id).then((response) =>
    response.data.map(
      (item2: {
        user: {firstName: string}
        id: number
        userName: string
        eventId?: number | undefined
      }) => ({
        ...item2,
        evaluatorId: item.id,
        userName: item2 && ` ${item2.user.firstName}`,
      }),
    ),
  )
  return data
}

export default getEventEvaluatorEvaluateesList
