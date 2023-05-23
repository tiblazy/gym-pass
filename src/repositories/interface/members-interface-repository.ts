import { Member } from "@prisma/client";

class MembersRepository {

  create: (member: Member): Promise<Member>
}