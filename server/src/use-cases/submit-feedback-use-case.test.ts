import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
  it('should be able submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, 13ji1adijsd131w'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  });

  it('should not able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, 13ji1adijsd131w'
    })).rejects.toThrow();
  });

  it('should not able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64, 13ji1adijsd131w'
    })).rejects.toThrow();
  });

  it('should not able to submit feedback with invalid feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tudo bugado',
      screenshot: 'test.png'
    })).rejects.toThrow();
  });
})