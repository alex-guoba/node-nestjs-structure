import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { CrudService } from '.';
import { configuration } from '../../config';
import { Sampletable1 } from '../../entity/sampledb1';

let moduleRef: TestingModule;
let crud: CrudService;
let idx: number;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        ...(<ConnectionOptions>(await configuration()).db),
        entities: [Sampletable1],
      }),
      TypeOrmModule.forFeature([Sampletable1]),
    ],
    providers: [CrudService],
  }).compile();

  crud = moduleRef.get(CrudService);
});

test('create', async () => {
  const result = await crud.create({ title: 'FooBar', content: 'Hello Jack', tags: ['tag1', 'tag2'] });
  expect(result).toHaveProperty('id');
  idx = result.id;
});

test('read', async () => {
  expect(await crud.read(idx)).toBeInstanceOf(Sampletable1);
});

test('update', async () => {
  expect(await crud.update(idx, { title: 'Blahblahblah' })).toHaveProperty('affected');
});

test('delete', async () => {
  const result = await crud.remove(idx);
  expect(result).toHaveProperty('affected');
  expect(result.affected).toBe(1);
});

afterAll(async () => {
  await moduleRef?.close();
});
