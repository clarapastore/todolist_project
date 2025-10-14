const Todo = require("../lib/todo");
const TodoList = require("../lib/todolist");

describe("Todolist", () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  test("calling toArray returns the list in array form", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("calling first returns the first item in the list", () => {
    expect(list.first()).toEqual(todo1);
  });

  test("calling last returns the last item in the list", () => {
    expect(list.last()).toEqual(todo3);
  });

  test("calling shift removes and returns the first item in the list", () => {
    let firstItem = list.shift();

    expect(list.toArray()).toEqual([todo2, todo3]);
    expect(firstItem).toEqual(todo1);
  });

  test("calling pop removes and returns the last item in the list", () => {
    let lastItem = list.pop();

    expect(list.toArray()).toEqual([todo1, todo2]);
    expect(lastItem).toEqual(todo3);
  });

  test("calling isDone returns false with incompleted todos", () => {
    expect(list.isDone()).toBe(false);
  });

  test("TypeError is thrown when adding non todo item", () => {
    expect(() => {
      list.add(1);
    }).toThrow(TypeError);

    expect(() => {
      list.add("hello");
    }).toThrow(TypeError);
  });

  test("itemAt throws ReferenceError when index is not valid, returns reference to todo otherwise", () => {
    expect(() => {
      list.itemAt(-1);
    }).toThrow(ReferenceError);

    expect(() => {
      list.itemAt(4);
    }).toThrow(ReferenceError);

    expect(list.itemAt(1)).toEqual(todo2);
  });

  test("markDoneAt marks todo done, throws ReferenceError if out of range", () => {
    list.markDoneAt(1);

    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);

    expect(() => {
      list.markDoneAt(-1);
    }).toThrow(ReferenceError);
  });

  test("markUndoneAt marks todo undone, throws ReferenceError if out of range", () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);

    expect(() => {
      list.markUndoneAt(-1);
    }).toThrow(ReferenceError);
  });

  test("markAllDone marks all todos as done", () => {
    list.markAllDone();

    expect(list.isDone()).toBe(true);
  });

  test("removeAt removes todo at index, raises ReferenceError when out of range", () => {
    expect(list.removeAt(1)).toEqual([todo2]);

    expect(() => list.removeAt(4)).toThrow(ReferenceError);
  });

  test("toString returns string representation of the list", () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test("toString returns string representation of done todo", () => {
    let string = `---- Today's Todos ----\n[X] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;
    todo1.markDone();

    expect(list.toString()).toBe(string);
  });

  test("toString returns string representation of all done todos", () => {
    let string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;
    list.markAllDone();

    expect(list.toString()).toBe(string);
  });

  test("forEach iterates through elements in list", () => {
    let testedElements = [];

    list.forEach((el) => testedElements.push(el));

    expect(testedElements).toEqual([todo1, todo2, todo3]);
  });

  test("filter returns new arr containing el for which callback is truthy", () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter((todo) => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});
