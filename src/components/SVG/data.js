import uuid from 'uuid/v4'

const uuid1 = uuid()
const uuid2 = uuid()
const uuid3 = uuid()
export default {
    steps: [
      {
        uuid: uuid1,
        title: 'Test',
        description: '',
        end_available: false,
        input_expected: 3,
        next_step_uuids: [uuid2,uuid3],
        executors: [],
        meta: {
          x: 10,
          y: 100,
          color: "#C2185B",
          width: 200,
          height: 100,
          borderRadius: 5
        }
      },
      {
        uuid: uuid2,
        title: 'Test  2',
        description: '',
        end_available: false,
        input_expected: 3,
        next_step_uuids: [],
        executors: [],
        meta: {
          x: 300,
          y: 99,
          color: "#1f9d55",
          width: 200,
          height: 100,
          borderRadius: 5
        }
      },
      {
        uuid: uuid3,
        title: 'Test 3',
        description: '',
        end_available: false,
        input_expected: 3,
        next_step_uuids: [],
        executors: [],
        meta: {
          x: 10,
          y: 500,
          color: "#1f9d55",
          width: 200,
          height: 100,
          borderRadius: 5
        }
      }
    ]
  }