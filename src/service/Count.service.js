import { Subject } from 'rxjs';

const totalSubject = new Subject();
const deletedSubject = new Subject();

export const CountService = {
    sendTotal: count1 => totalSubject.next(count1),
    deletedUser: count2 => deletedSubject.next(count2),
    onTotalCount: () => totalSubject.asObservable(),
    onDeletedCount: () => deletedSubject.asObservable()
};
