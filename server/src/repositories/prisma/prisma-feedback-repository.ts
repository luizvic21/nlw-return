import { prisma } from "../../configs/prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}