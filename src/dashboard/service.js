class DashboardService {
  constructor(feedPath) {
    this.evtSource = new EventSource(feedPath)
  }

  onMessage(callback) {
    this.evtSource.onmessage = function(event) {
      const dto = JSON.parse(event.data)
      callback(dto)
    }
  }
}

export default DashboardService
