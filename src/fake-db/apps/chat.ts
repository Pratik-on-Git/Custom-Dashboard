// Type Imports
import type { ChatContact, ChatMessage, Conversation } from '@/types/apps/chat-types'

/** [fromMe, ISO time, text] — oldest first */
type Line = [boolean, string, string]

const thread = (id: string, lines: Line[]): ChatMessage[] =>
  lines.map(([fromMe, sentAt, text], index) => ({ id: `${id}-${index}`, fromMe, sentAt, text }))

const contact = (id: string, username: string, fullName: string, title: string, avatar: number): ChatContact => ({
  id,
  username,
  fullName,
  title,
  avatar: `/images/avatars/avatar-${avatar}.webp`
})

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    unread: 2,
    contact: contact('alex', 'alex_dev', 'Alex John', 'Senior Backend Dev', 2),
    messages: thread('conv-1', [
      [false, '2026-11-23T09:15:00', 'Hey, how are you doing?'],
      [true, '2026-11-23T09:16:30', "Hey Alex, I'm doing well! How about you?"],
      [false, '2026-11-23T09:17:10', "I'm good, thanks! Did you finish the project?"],
      [true, '2026-11-23T09:18:45', 'Almost done. Just need to review a few things.'],
      [false, '2026-11-23T09:19:20', 'Great! Let me know if you need any help.'],
      [true, '2026-11-23T09:20:10', 'Will do! Thanks, Alex.'],
      [false, '2026-11-23T09:21:05', 'By the way, have you seen the new feature update?'],
      [true, '2026-11-23T09:22:00', "No, not yet. What's new?"],
      [false, '2026-11-23T09:23:10', "They've added a dark mode option! It looks really sleek."],
      [true, '2026-11-23T09:24:30', "Oh, nice! I've been waiting for that. I'll check it out later."],
      [false, '2026-11-23T09:25:15', 'Yeah, let me know what you think.'],
      [true, '2026-11-23T09:26:50', 'For sure. Anyway, I should get back to reviewing the project.'],
      [false, '2026-11-24T11:11:30', 'Alright, talk to you later!'],
      [false, '2026-11-24T11:15:15', 'Ping me once the review is in.']
    ])
  },
  {
    id: 'conv-2',
    unread: 1,
    contact: contact('taylor', 'taylor.codes', 'Taylor Grande', 'Tech Lead', 3),
    messages: thread('conv-2', [
      [false, '2026-11-24T10:30:00', 'Hey, did you check out that new tutorial?'],
      [true, '2026-11-24T10:32:00', 'Not yet, is it good?'],
      [false, '2026-11-24T10:35:00', "Yeah, it's really well-explained. You should give it a try."]
    ])
  },
  {
    id: 'conv-3',
    unread: 0,
    contact: contact('john', 'john_stack', 'John Stack', 'QA', 4),
    messages: thread('conv-3', [
      [false, '2026-11-22T18:45:00', 'Are we still on for the meeting tomorrow?'],
      [true, '2026-11-22T18:50:00', "Yes, same time as usual. I'll send the invite shortly."],
      [false, '2026-11-22T18:55:00', 'Great, see you then!'],
      [true, '2026-11-22T18:59:00', 'Yep, see ya.']
    ])
  },
  {
    id: 'conv-4',
    unread: 0,
    contact: contact('megan', 'megan_frontend', 'Megan Flux', 'Jr Developer', 5),
    messages: thread('conv-4', [
      [false, '2026-11-23T11:20:00', 'Hey! Do you have time to review my PR today?'],
      [true, '2026-11-23T11:25:00', "Sure thing! I'll take a look in the next hour."],
      [false, '2026-11-23T11:30:00', 'Thanks, appreciate it!']
    ])
  },
  {
    id: 'conv-5',
    unread: 0,
    contact: contact('david', 'dev_david', 'David Brown', 'Senior UI/UX Designer', 6),
    messages: thread('conv-5', [
      [false, '2026-11-23T11:55:00', 'I finished the design for the dashboard. Thoughts?'],
      [false, '2026-11-23T11:58:00', 'Just sent you the files. Let me know if you need any changes.'],
      [true, '2026-11-23T12:00:00', "Great, I'll review them now!"]
    ])
  },
  {
    id: 'conv-6',
    unread: 0,
    contact: contact('julia', 'julia.design', 'Julia Carter', 'Product Designer', 7),
    messages: thread('conv-6', [
      [true, '2026-11-22T14:05:00', "How's the project looking on your end?"],
      [false, '2026-11-22T14:10:00', "Same here! It's coming together nicely."],
      [true, '2026-11-22T14:15:00', "I'm really excited to see the final product!"]
    ])
  },
  {
    id: 'conv-7',
    unread: 0,
    contact: contact('brad', 'brad_dev', 'Brad Wilson', 'CEO', 8),
    messages: thread('conv-7', [
      [false, '2026-11-23T15:35:00', 'Hey, any news on the release?'],
      [true, '2026-11-23T15:40:00', 'The release has been delayed to next week.'],
      [false, '2026-11-23T15:45:00', 'Got it! Thanks for the update.']
    ])
  },
  {
    id: 'conv-8',
    unread: 0,
    contact: contact('katie', 'katie_ui', 'Katie Lee', 'QA', 9),
    messages: thread('conv-8', [
      [false, '2026-11-23T09:45:00', 'Is the meeting still on?'],
      [true, '2026-11-23T09:48:00', "Perfect! We'll start as soon as you're in."],
      [false, '2026-11-23T09:50:00', "I'll join the call in a few minutes."]
    ])
  },
  {
    id: 'conv-9',
    unread: 0,
    contact: contact('matt', 'matt_fullstack', 'Matt Green', 'Full-stack Dev', 10),
    messages: thread('conv-9', [
      [false, '2026-11-23T10:20:00', 'The frontend updates are done. How does it look?'],
      [true, '2026-11-23T10:23:00', 'Could you update the backend as well?'],
      [false, '2026-11-23T10:25:00', "Sure thing, I'll send over the updates shortly."]
    ])
  },
  {
    id: 'conv-10',
    unread: 0,
    contact: contact('sophie', 'sophie_dev', 'Sophie Alex', 'Jr. Frontend Dev', 11),
    messages: thread('conv-10', [
      [false, '2026-11-23T16:00:00', 'The feature is implemented. Can you review it?'],
      [false, '2026-11-23T16:05:00', 'Let me know if you need anything else.'],
      [true, '2026-11-23T16:10:00', "Thanks! I'll review your code and get back to you."]
    ])
  }
]
