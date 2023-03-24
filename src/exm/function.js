// initial state:
// {
//     projects: [],
//     tasks: [],
//     archive: []
// }

// project
// {name: string, owner: `0x${string}`, open: boolean}

// action.input :
// {
//     fn: "TODO" || "DOING" || "DONE" || "ARCHIVE" || "UPDATE" || "REMOVE" || "COMMENT" || default == "CREATE",
//     index: number,
//     data: {
//          projectId: number
//          status: "TODO" || "DOING" || "DONE",
//          title: string,
//          description: string,
//          duration?: number[2], // [start, end]
//          assignee?: `0x${string}`,
//          PR?: string, // link to github PR that closes it
//          priority?: "LOW" || "MEDIUM" || "HIGH",
//          comments?: string[],

//          # untracked data
//          comment?: string // if present, pushes to state
//          name?: project name
//          owner?: project owner
//          open?: project status
//      }
// }

export const handle = async (state, action) => {
  const fn = action.input.fn;
  const id = action.input?.index;
  const data = action.input?.data;

  let ok = true;

  switch (fn) {
    case "CREATE_PROJECT":
      state.projects.push(data);
      break;
    case "TOGGLE_PROJECT":
      state.projects[id].open = !state.projects[id].open;
      break;
    case "TODO":
      state.tasks[id].status = "TODO";
      break;
    case "DOING":
      state.tasks[id].status = "DOING";
      break;
    case "DONE":
      state.tasks[id].status = "DONE";
      break;
    case "ARCHIVE":
      const task = state.tasks.splice(id, 1);
      state.archive.concat(task);
      break;
    case "UPDATE":
      validData(data) ? (state.tasks[id] = data) : (ok = false);
      break;
    case "REMOVE":
      state.tasks.splice(id, 1);
      break;
    case "COMMENT":
      state.tasks[id].comments.push(data.comment);
      break;
    default:
      validId(data.projectId, state.projects.length) && validData(data)
        ? state.tasks.push(data)
        : (ok = false);
      break;
  }

  return { ok };
};

const validId = (id, len) => {
  const id = int(Math.abs(id));
  if (id > len - 1) {
    return false;
  }
  return true;
};

const validData = (data) => {
  /**
   * see truth table
   */
  let validity = true;

  // check status is a valid status
  if (Object.hasOwn(data, "status")) {
    validity = validity && ["TODO", "DOING", "DONE"].includes(data.status);
  }

  // check duration is accurate
  if (Object.hasOwn(data, "duration")) {
    validity = validity && Array.isArray(data.duration) && data.duration.length == 2;
  }

  // check assignee is a valid address
  if (Object.hasOwn(data, "assignee")) {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    validity = validity && regex.test(data.assignee);
  }

  // check priority is valid
  if (Object.hasOwn(data, "priority")) {
    validity = validity && ["LOW", "MEDIUM", "HIGH"].includes(data.priority);
  }

  // check that an accurate github pr is linked
  if (Object.hasOwn(data, "PR")) {
    const regex = /https:\/\/github.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+\/pull\/\d+/;
    validity = validity && regex.test(data.PR);
  }

  return validity;
};
