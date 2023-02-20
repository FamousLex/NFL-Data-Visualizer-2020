// client-side functionality (JS)

// Function to get the value from a text field, clear it, and return the retrieved value
function get_and_clear(element) {
    let temp = element.value;
    element.value = "";
    return temp;
}

// Function called when button is clicked to input years
function getPosition() {
    let position_elem = document.getElementById("getPosition");
    let position = position_elem.value;
    // console.log(position)

    let nfl_data = position;
    let nfl_data_JSON = JSON.stringify(nfl_data);
    ajaxPostRequest("position_input", nfl_data_JSON, testBack)

}


function getInputs() {
    let position_elem = document.getElementById("getPosition");
    let checkPosition = position_elem.value;
    if (checkPosition == "QB"){
      let player_name_elem = document.getElementById("playerName");
      let player_name = get_and_clear(player_name_elem);

      let player_data = player_name;
      let player_data_JSON = JSON.stringify(player_data);

      ajaxPostRequest("player_input", player_data_JSON, displayStatsQB);
    }
    else if (checkPosition == "RB"){
      let player_name_elem = document.getElementById("playerName");
      let player_name = get_and_clear(player_name_elem);

      let player_data = player_name;
      let player_data_JSON = JSON.stringify(player_data);

      ajaxPostRequest("player_input", player_data_JSON, displayStatsRB);
    }

    else if (checkPosition == "WR"){
      // console.log('We in');
      let player_name_elem = document.getElementById("playerName");
      let player_name = get_and_clear(player_name_elem);

      let player_data = player_name;
      let player_data_JSON = JSON.stringify(player_data);

      ajaxPostRequest("player_input", player_data_JSON, displayStatsWR);
    }

    else if (checkPosition == "TE"){
      let player_name_elem = document.getElementById("playerName");
      let player_name = get_and_clear(player_name_elem);

      let player_data = player_name;
      let player_data_JSON = JSON.stringify(player_data);

      ajaxPostRequest("player_input", player_data_JSON, displayStatsTE);
    }
    
}

// callback 
function displayStatsQB(response) {
  let data = JSON.parse(response);

  let completions = [];
  let individualCompletions = [];
  let passAttempts = [];
  let individualPassAttempts = [];
  let passingYards = [];
  let individualPassingYards = [];
  let passingTouchdowns = [];
  let individualPassingTouchdowns = [];
  let interceptions = [];
  let individualInterceptions = [];

  for (let i = 0; i < 40; i ++) {
    completions[i] = data[0]['completions'][i];
    passAttempts[i] = data[0]['passAttempts'][i];
    passingYards[i] = data[0]['passingYards'][i];
    passingTouchdowns[i] = data[0]['passingTouchdowns'][i];
    interceptions[i] = data[0]['interceptions'][i];
  }
  if (data.length == 3) {
    individualRosterPercentage = data[2]['rosterPercent'];
    individualCompletions[0] = data[1]['completions'][0];
    individualPassAttempts[0] = data[1]['passAttempts'][0];
    individualPassingYards[0] = data[1]['passingYards'][0];
    individualPassingTouchdowns[0] = data[1]['passingTouchdowns'][0];
    individualInterceptions[0] = data[1]['interceptions'][0];
  }

  let rosterData = [{
    values: individualRosterPercentage,
    labels: ['Rostered', 'Not Rostered'],
    type: 'pie'
  }];

  let rosterLayout = {
    height: 400,
    width: 500,
    title: 'Roster Percentage'
  };

  Plotly.newPlot('rosterPercent', rosterData, rosterLayout);

  let totalCompletionsTrace = {
    x: completions,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Quarterbacks"
  };
  let individualCompletionsTrace = {
    x: individualCompletions,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let completionPlotData = [totalCompletionsTrace, individualCompletionsTrace];
  let completionsLayout = {barmode: "stack", title: 'Completions'};
  Plotly.newPlot('charts1', completionPlotData, completionsLayout);

  let totalPassAttemptsTrace = {
    x: passAttempts,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Quarterbacks"
  };
  let individualPassAttemptsTrace = {
    x: individualPassAttempts,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let passAttemptPlotData = [totalPassAttemptsTrace, individualPassAttemptsTrace];
  let passAttemptsLayout = {barmode: "stack", title: 'Pass Attempts'};
  Plotly.newPlot('charts2', passAttemptPlotData, passAttemptsLayout);

  let totalPassingYardsTrace = {
    x: passingYards,
    type: 'histogram',
    xbins: { size: 100, },
    name: "All Quarterbacks"
  };
  let individualPassingYardsTrace = {
    x: individualPassingYards,
    type: 'histogram',
    xbins: { size: 100, },
    name: data[1]['players'][0]
  };
  let passingYardsPlotData = [totalPassingYardsTrace, individualPassingYardsTrace];
  let passingYardsLayout = {barmode: "stack", title: 'Passing Yards'};
  Plotly.newPlot('charts3', passingYardsPlotData, passingYardsLayout);

  let totalPassingTouchdownsTrace = {
    x: passingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: "All Quarterbacks'"
  };
  let individualPassingTouchdownsTrace = {
    x: individualPassingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: data[1]['players'][0]
  };
  let passingTouchdownsPlotData = [totalPassingTouchdownsTrace, individualPassingTouchdownsTrace];
  let passingTouchdownsLayout = {barmode: "stack", title: 'Passing Touchdowns'};
  Plotly.newPlot('charts4', passingTouchdownsPlotData, passingTouchdownsLayout);

  let totalInterceptionsTrace = {
    x: interceptions,
    type: 'histogram',
    xbins: { size: 1, },
    name: "All Quarterbacks"
  };
  let individualInterceptionsTrace = {
    x: individualInterceptions,
    type: 'histogram',
    xbins: { size: 1, },
    name: data[1]['players'][0]
  };

  let interceptionsPlotData = [totalInterceptionsTrace, individualInterceptionsTrace];
  let interceptionsLayout = {barmode: "stack", title: 'Interceptions'};
  Plotly.newPlot('charts5', interceptionsPlotData, interceptionsLayout);

}

// callback 
function displayStatsRB(response) {
  let data = JSON.parse(response);

  let rushAttempts = [];
  let individualRushAttempts = [];
  let rushYards = [];
  let individualRushYards = [];
  let rushTouchdowns = [];
  let individualRushTouchdowns = [];
  let receivingYards = [];
  let individualReceivingYards = [];
  let receivingTouchdowns = [];
  let individualReceivingTouchdowns = [];

  for (let i = 0; i < 40; i ++) {
    rushAttempts[i] = data[0]['rushAttempts'][i];
    rushYards[i] = data[0]['rushYards'][i];
    rushTouchdowns[i] = data[0]['rushTouchdowns'][i];
    receivingYards[i] = data[0]['receivingYards'][i];
    receivingTouchdowns[i] = data[0]['receivingTouchdowns'][i];
  }
  if (data.length == 3) {
    individualRosterPercentage = data[2]['rosterPercent'];
    individualRushAttempts[0] = data[1]['rushAttempts'][0];
    individualRushYards[0] = data[1]['rushYards'][0];
    individualRushTouchdowns[0] = data[1]['rushTouchdowns'][0];
    individualReceivingYards[0] = data[1]['receivingYards'][0];
    individualReceivingTouchdowns[0] = data[1]['receivingTouchdowns'][0];
  }

  let rosterData = [{
    values: individualRosterPercentage,
    labels: ['Rostered', 'Not Rostered'],
    type: 'pie'
  }];

  let rosterLayout = {
    height: 400,
    width: 500,
    title: 'Roster Percentage'
  };

  Plotly.newPlot('rosterPercent', rosterData, rosterLayout);

  let totalRushAttemptsTrace = {
    x: rushAttempts,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Runningbacks"
  };
  let individualRushAttemptsTrace = {
    x: individualRushAttempts,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let plotData = [totalRushAttemptsTrace, individualRushAttemptsTrace];
  let layout = {barmode: "stack", title: 'Rush Attempts'};
  Plotly.newPlot('charts1', plotData, layout);

  let totalRushYardsTrace = {
    x: rushYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Quarterbacks"
  };
  let individualRushYardsTrace = {
    x: individualRushYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let rushYardsPlotData = [totalRushYardsTrace, individualRushYardsTrace];
  let rushYardsLayout = {barmode: "stack", title: 'Rush Yards'};
  Plotly.newPlot('charts2', rushYardsPlotData, rushYardsLayout);

  let totalRushTouchdownsTrace = {
    x: rushTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: "All Runningbacks"
  };
  let individualRushTouchdownsTrace = {
    x: individualRushTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: data[1]['players'][0]
  };
  let rushTouchdownsPlotData = [totalRushTouchdownsTrace, individualRushTouchdownsTrace];
  let rushTouchdownsLayout = {barmode: "stack", title: 'Rush Touchdowns'};
  Plotly.newPlot('charts3', rushTouchdownsPlotData, rushTouchdownsLayout);

  let totalReceivingYardsTrace = {
    x: receivingYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Runningbacks"
  };
  let individualReceivingYardsTrace = {
    x: individualReceivingYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let receivingYardsPlotData = [totalReceivingYardsTrace, individualReceivingYardsTrace];
  let receivingYardsLayout = {barmode: "stack", title: 'Receiving Yards'};
  Plotly.newPlot('charts4', receivingYardsPlotData, receivingYardsLayout);

  let totalReceivingTouchdownsTrace = {
    x: receivingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: "All Runningbacks"
  };
  let individualReceivingTouchdownsTrace = {
    x: individualReceivingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: data[1]['players'][0]
  };
  let receivingTouchdownsPlotData = [totalReceivingTouchdownsTrace, individualReceivingTouchdownsTrace];
  let receivingTouchdownsLayout = {barmode: "stack", title: 'Receiving Touchdowns'};
  Plotly.newPlot('charts5', receivingTouchdownsPlotData, receivingTouchdownsLayout);
}


function displayStatsWR(response) {
  let data = JSON.parse(response);

  let receptions = [];
  let individualReceptions = [];
  let targets = [];
  let individualTargets = [];
  let receivingYards = [];
  let individualReceivingYards = [];
  let longestReception = [];
  let individualLongestReception = [];
  let receivingTouchdowns = [];
  let individualReceivingTouchdowns = [];

  for (let i = 0; i < 60; i ++) {
    receptions[i] = data[0]['receptions'][i];
    targets[i] = data[0]['targets'][i];
    receivingYards[i] = data[0]['receivingYards'][i];
    longestReception[i] = data[0]['longestReception'][i];
    receivingTouchdowns[i] = data[0]['receivingTouchdowns'][i];
  }
  if (data.length == 3) {
    individualRosterPercentage = data[2]['rosterPercent'];
    individualReceptions[0] = data[1]['receptions'][0];
    individualTargets[0] = data[1]['targets'][0];
    individualReceivingYards[0] = data[1]['receivingYards'][0];
    individualReceptions[0] = data[1]['receptions'][0];
    individualLongestReception[0] = data[1]['longestReception'][0];
    individualReceivingTouchdowns[0] = data[1]['receivingTouchdowns'][0];
  }

  let rosterData = [{
    values: individualRosterPercentage,
    labels: ['Rostered', 'Not Rostered'],
    type: 'pie'
  }];

  let rosterLayout = {
    height: 400,
    width: 500,
    title: 'Roster Percentage'
  };

  Plotly.newPlot('rosterPercent', rosterData, rosterLayout);

  let totalReceptionsTrace = {
    x: receptions,
    type: 'histogram',
    xbins: { size: 10, },
    name: "All Wide Receivers"
  };
  let individualReceptionsTrace = {
    x: individualReceptions,
    type: 'histogram',
    xbins: { size: 10, },
    name: data[1]['players'][0]
  };
  let receptionsPlotData = [totalReceptionsTrace, individualReceptionsTrace];
  let receptionsLayout = {barmode: "stack", title: 'Receptions'};
  Plotly.newPlot('charts1', receptionsPlotData, receptionsLayout);

  let totalTargetsTrace = {
    x: targets,
    type: 'histogram',
    xbins: { size: 10, },
    name: "All Wide Receivers"
  };
  let individualTargetsTrace = {
    x: individualTargets,
    type: 'histogram',
    xbins: { size: 10, },
    name: data[1]['players'][0]
  };
  let targetsPlotData = [totalTargetsTrace, individualTargetsTrace];
  let targetsLayout = {barmode: "stack", title: 'Targets'};
  Plotly.newPlot('charts2', targetsPlotData, targetsLayout);

  let totalReceivingYardsTrace = {
    x: receivingYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Wide Receivers"
  };
  let individualReceivingYardsTrace = {
    x: individualReceivingYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let receivingYardsPlotData = [totalReceivingYardsTrace, individualReceivingYardsTrace];
  let receivingYardsLayout = {barmode: "stack", title: 'Receiving Yards'};
  Plotly.newPlot('charts3', receivingYardsPlotData, receivingYardsLayout);

  let totalLongestReceptionTrace = {
    x: longestReception,
    type: 'histogram',
    xbins: { size: 5, },
    name: "All Wide Receivers"
  };
  let individualLongestReceptionTrace = {
    x: individualLongestReception,
    type: 'histogram',
    xbins: { size: 5, },
    name: data[1]['players'][0]
  };
  let longestReceptionPlotData = [totalLongestReceptionTrace, individualLongestReceptionTrace];
  let longestReceptionLayout = {barmode: "stack", title: 'Longest Reception'};
  Plotly.newPlot('charts4', longestReceptionPlotData, longestReceptionLayout);

  let totalReceivingTouchdownsTrace = {
    x: receivingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: "All Wide Receivers"
  };
  let individualReceivingTouchdownsTrace = {
    x: individualReceivingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: data[1]['players'][0]
  };
  let receivingTouchdownsPlotData = [totalReceivingTouchdownsTrace, individualReceivingTouchdownsTrace];
  let receivingTouchdownsLayout = {barmode: "stack", title: 'Receiving Touchdowns'};
  Plotly.newPlot('charts5', receivingTouchdownsPlotData, receivingTouchdownsLayout);
}

function displayStatsTE(response) {
  let data = JSON.parse(response);

  let receptions = [];
  let individualReceptions = [];
  let targets = [];
  let individualTargets = [];
  let receivingYards = [];
  let individualReceivingYards = [];
  let longestReception = [];
  let individualLongestReception = [];
  let receivingTouchdowns = [];
  let individualReceivingTouchdowns = [];

  for (let i = 0; i < 40; i ++) {
    receptions[i] = data[0]['receptions'][i];
    targets[i] = data[0]['targets'][i];
    receivingYards[i] = data[0]['receivingYards'][i];
    longestReception[i] = data[0]['longestReception'][i];
    receivingTouchdowns[i] = data[0]['receivingTouchdowns'][i];
  }
  if (data.length == 3) {
    individualRosterPercentage = data[2]['rosterPercent'];
    individualReceptions[0] = data[1]['receptions'][0];
    individualTargets[0] = data[1]['targets'][0];
    individualReceivingYards[0] = data[1]['receivingYards'][0];
    individualReceptions[0] = data[1]['receptions'][0];
    individualLongestReception[0] = data[1]['longestReception'][0];
    individualReceivingTouchdowns[0] = data[1]['receivingTouchdowns'][0];
  }

  let rosterData = [{
    values: individualRosterPercentage,
    labels: ['Rostered', 'Not Rostered'],
    type: 'pie'
  }];

  let rosterLayout = {
    height: 400,
    width: 500,
    title: 'Roster Percentage'
  };

  Plotly.newPlot('rosterPercent', rosterData, rosterLayout);

  let totalReceptionsTrace = {
    x: receptions,
    type: 'histogram',
    xbins: { size: 10, },
    name: "All Tight Ends"
  };
  let individualReceptionsTrace = {
    x: individualReceptions,
    type: 'histogram',
    xbins: { size: 10, },
    name: data[1]['players'][0]
  };
  let receptionsPlotData = [totalReceptionsTrace, individualReceptionsTrace];
  let receptionsLayout = {barmode: "stack", title: 'Receptions'};
  Plotly.newPlot('charts1', receptionsPlotData, receptionsLayout);

  let totalTargetsTrace = {
    x: targets,
    type: 'histogram',
    xbins: { size: 10, },
    name: "All Tight Ends"
  };
  let individualTargetsTrace = {
    x: individualTargets,
    type: 'histogram',
    xbins: { size: 10, },
    name: data[1]['players'][0]
  };
  let targetsPlotData = [totalTargetsTrace, individualTargetsTrace];
  let targetsLayout = {barmode: "stack", title: 'Targets'};
  Plotly.newPlot('charts2', targetsPlotData, targetsLayout);

  let totalReceivingYardsTrace = {
    x: receivingYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: "All Tight Ends"
  };
  let individualReceivingYardsTrace = {
    x: individualReceivingYards,
    type: 'histogram',
    xbins: { size: 25, },
    name: data[1]['players'][0]
  };
  let receivingYardsPlotData = [totalReceivingYardsTrace, individualReceivingYardsTrace];
  let receivingYardsLayout = {barmode: "stack", title: 'Receiving Yards'};
  Plotly.newPlot('charts3', receivingYardsPlotData, receivingYardsLayout);

  let totalLongestReceptionTrace = {
    x: longestReception,
    type: 'histogram',
    xbins: { size: 5, },
    name: "All Tight Ends"
  };
  let individualLongestReceptionTrace = {
    x: individualLongestReception,
    type: 'histogram',
    xbins: { size: 5, },
    name: data[1]['players'][0]
  };
  let longestReceptionPlotData = [totalLongestReceptionTrace, individualLongestReceptionTrace];
  let longestReceptionLayout = {barmode: "stack", title: 'Longest Reception'};
  Plotly.newPlot('charts4', longestReceptionPlotData, longestReceptionLayout);

  let totalReceivingTouchdownsTrace = {
    x: receivingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: "All Tight Ends"
  };
  let individualReceivingTouchdownsTrace = {
    x: individualReceivingTouchdowns,
    type: 'histogram',
    xbins: { size: 1, },
    name: data[1]['players'][0]
  };
  let receivingTouchdownsPlotData = [totalReceivingTouchdownsTrace, individualReceivingTouchdownsTrace];
  let receivingTouchdownsLayout = {barmode: "stack", title: 'Receiving Touchdowns'};
  Plotly.newPlot('charts5', receivingTouchdownsPlotData, receivingTouchdownsLayout);
}

function testBack(response){
  console.log(response)
}