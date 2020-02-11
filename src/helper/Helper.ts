import { Subject } from 'rxjs'

const subject = new Subject()

export const Helper = {
  sendNotifier: (text: any) => subject.next({ text: text }),
  getNotifier: () => subject.asObservable()
}
