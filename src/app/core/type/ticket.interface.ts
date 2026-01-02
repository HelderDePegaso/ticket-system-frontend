import { UserSimple } from "./user-simple.interface";

export interface Ticket {
  uuid: string;
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS' | 'PENDING' | 'ESCALATED' | 'CANCELLED' | 'SEEN' | 'RESOLVED';
  requester: UserSimple;
  assignedTo: UserSimple[]
  areaUuid: string;
  requestDate: string;
  updatedAt: string;
}
