import { PrismaClient } from '@prisma/client';

const FIRST_COMMENT_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_COMMENT_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_LIKE_UUID = '39614113-7ad5-45b6-8093-06455437e1e1';
const SECOND_LIKE_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea201';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      type: 'text',
      tags: ['tag1', 'tag2'],
      userId: FIRST_USER_ID,
      originalUserId: null,
      postDate: new Date(),
      isPublished: true,
      originalId: null,
      titleText: 'Post in Blog with text content',
      previewText: 'Bla-bla-bla',
      text: 'Full bla-bla-bla',
    },
    {
        id: SECOND_POST_UUID,
        type: 'quote',
        tags: ['tag1', 'tagQuote'],
        userId: SECOND_USER_ID,
        originalUserId: FIRST_USER_ID,
        postDate: new Date(),
        isPublished: true,
        originalId: FIRST_POST_UUID,
        textQuote: 'Full bla-bla-bla',
        authorQuote: 'Pushkin'
      },
  ]
}

function getComments() {
    return [
      { 
          id: FIRST_COMMENT_UUID, 
          postId: FIRST_POST_UUID,
          userId: SECOND_USER_ID,
          text: 'Testing comment text',
      },
      { 
          id: SECOND_COMMENT_UUID, 
          postId: SECOND_POST_UUID,
          userId: FIRST_USER_ID,
          text: 'Very likes your post!',
      },
    ];
  }

  function getLikes() {
    return [
      { 
          id: FIRST_LIKE_UUID, 
          postId: FIRST_POST_UUID,
          userId: SECOND_USER_ID,
      },
      { 
          id: SECOND_LIKE_UUID, 
          postId: SECOND_POST_UUID,
          userId: FIRST_USER_ID,
      },
    ];
  }

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
    where: {id: post.id},
    update: {},
    create: post
    })
  }

  const mockComments = getComments();
  for (const comment of mockComments) {
    await prismaClient.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: comment
    });
  }

  const mockLikes = getLikes();
  for (const like of mockLikes) {
    await prismaClient.like.upsert({
      where: { id: like.id },
      update: {},
      create: like
    });
  }

console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();