const fs = require("fs");

const filterData = ({ row }) => {
  const splittedRow = row.split(" ");
  if (
    ["AM", "PM"].includes(splittedRow[2]) &&
    splittedRow[3] == "-" &&
    splittedRow[4] == "+91"
  ) {
    if (splittedRow[6].slice(-1) == ":") {
      return {
        ok: true,
        type: "msg",
        data: {
          date: splittedRow[0].slice(0, -1),
          number: `${splittedRow[5]} ${splittedRow[6].slice(0, -1)}`,
        },
      };
    } else if (splittedRow[7] == "joined") {
      return {
        ok: true,
        type: "joined",
        data: {
          date: splittedRow[0].slice(0, -1),
          number: `${splittedRow[5]} ${splittedRow[6]}`,
        },
      };
    }
  }
  return { ok: false };
};

const extractingRelevantData = ({ data }) => {
  const splitData = data.split("\n");
  const joinedUsersData = [];
  const messagedUsersData = [];

  splitData.forEach((row) => {
    const filterResponse = filterData({ row });
    if (filterResponse.ok) {
      if (filterResponse.type === "msg") {
        messagedUsersData.push(filterResponse.data);
      } else {
        joinedUsersData.push(filterResponse.data);
      }
    }
  });
  return { joinedUsersData, messagedUsersData };
};

const dataGrouping = ({ data, type }) => {
  return data.reduce((r, a) => {
    r[a[type]] = [...(r[a[type]] || []), a];
    return r;
  }, {});
};

const printActiveUsers = ({ groupedData }) => {
  let lastSevenDaysUsersByDate = [];
  for (let date in groupedData) {
    lastSevenDaysUsersByDate = lastSevenDaysUsersByDate.concat(
      groupedData[date]
    );
  }

  const numbersActiveOnDate = dataGrouping({
    data: lastSevenDaysUsersByDate,
    type: "number",
  });

  const activeUsers = [];
  for (let number in numbersActiveOnDate) {
    if (numbersActiveOnDate[number].length > 3) {
      activeUsers.push(`+91 ${number}`);
    }
  }

  console.log(
    `Total Active Users atleast for 4 days (from 9 days) - ${activeUsers.length}`
  );
  console.log(activeUsers);
};

module.exports = {
  chatAnalyser: async (req, res) => {
    const { joinedUsersData, messagedUsersData } = extractingRelevantData({
      data: fs.readFileSync("data.txt", "utf-8"),
    });

    let groupByDateOnMessaged = dataGrouping({
      data: messagedUsersData,
      type: "date",
    });
    let groupByDateOnJoined = dataGrouping({
      data: joinedUsersData,
      type: "date",
    });

    const listOfDates = new Set([
      ...Object.keys(groupByDateOnMessaged),
      ...Object.keys(groupByDateOnJoined),
    ]);

    const finalData = {};
    listOfDates.forEach((date) => {
      finalData[date] = {
        joined: groupByDateOnJoined[date]
          ? groupByDateOnJoined[date].length
          : 0,
        messaged: groupByDateOnMessaged[date]
          ? groupByDateOnMessaged[date].length
          : 0,
      };
    });

    console.log(finalData);

    // Processing for the answer of Question 3 - Finding active users
    const groupedDataOnMessage = { ...groupByDateOnMessaged };
    printActiveUsers({ groupedData: groupedDataOnMessage });

    return res.render("index", { finalData });
  },
};
