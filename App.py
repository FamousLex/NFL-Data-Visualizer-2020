import csv

def readCSV(filename):
  csvList = []
  with open(filename, encoding="utf-8", newline='')as file:
    reader = csv.reader(file, delimiter=",", quoting=csv.QUOTE_MINIMAL)
    header = next(reader)
    for line in reader:
      myDict={}
      for j in range(len(header)):
        key = header[j].replace("'", "")
        myDict[key] = line[j]
      csvList.append(myDict)
  return csvList

def writeCSV(filename, list_of_dictionaries):
  with open(filename, 'w', newline='')as f:
    writer = csv.writer(f)
    topRow_iterable = list_of_dictionaries[0].keys()
    topRow_list = list(topRow_iterable)
    writer.writerow(topRow_list)
    for record in list_of_dictionaries:
      valuesList = []
      for i in topRow_list:
        valuesList.append(record[i])
      writer.writerow(valuesList)


def getStatsByPosition(position, playerName):
  if position == 'QB':
    footballData = readCSV("data1/FantasyPros_Fantasy_Football_Statistics_QB.csv")
    plotData = []
    newDict = dict(rank = [], players = [], completions = [], passAttempts = [], completionPercentage = [], passingYards = [], passingYardsPerAttempt = [], passingTouchdowns = [], interceptions = [], sacks = [], rushAttempts = [], rushYards = [], rushTouchdowns= [], fumbles= [], gamesPlayed = [], totalFantasyPoints = [], fantasyPointsPerGame = [], rosterPercentage = [])
    individualDict = dict(rank = [], players = [], completions = [], passAttempts = [], passingYards = [], passingTouchdowns = [], interceptions = [])
    rosterDict = dict(rosterPercent = [])

    for i in range(len(footballData)):
      if int(footballData[i]['Rank']) < 41:
        newDict['rank'].append(footballData[i]['Rank'])
        newDict['players'].append(footballData[i]['Player'])
        newDict['completions'].append(footballData[i]['Completions'])   
        newDict['passAttempts'].append(footballData[i]['Attempts'])   
        newDict['completionPercentage'].append(footballData[i]['Completion Percentage'])
        newDict['passingYards'].append(footballData[i]['Passing Yards'])
        newDict['passingYardsPerAttempt'].append(footballData[i]['Passing Yards Per Attempt'])
        newDict['passingTouchdowns'].append(footballData[i]['Passing Touchdowns'])
        newDict['interceptions'].append(footballData[i]['Interceptions'])
        newDict['sacks'].append(footballData[i]['Sacks'])
        newDict['rushAttempts'].append(footballData[i]['Rush Attempts'])
        newDict['rushYards'].append(footballData[i]['Rushing Yards'])
        newDict['rushTouchdowns'].append(footballData[i]['Rushing Touchdowns'])
        newDict['fumbles'].append(footballData[i]['Fumbles Lost'])
        newDict['gamesPlayed'].append(footballData[i]['Games Played'])
        newDict['totalFantasyPoints'].append(footballData[i]['Total Fantasy Points'])
        newDict['fantasyPointsPerGame'].append(footballData[i]['Fantasy Points Per Game'])
        newDict['rosterPercentage'].append(footballData[i]['Roster Percentage'])

    for j in range(len(newDict['players'])):
      if playerName == newDict['players'][j][0:len(playerName)]:
        popIndex = j

        rosterDict['rosterPercent'].append(newDict['rosterPercentage'][j])
        rosterDict['rosterPercent'][0] = rosterDict['rosterPercent'][0].replace("%", "")
        rosterDict['rosterPercent'][0] = float(rosterDict['rosterPercent'][0])
        notRostered = 100 - float(rosterDict['rosterPercent'][0])
        rosterDict['rosterPercent'].append(notRostered)

        individualDict['rank'].append(newDict['rank'][j])
        individualDict['players'].append(newDict['players'][j])
        individualDict['completions'].append(newDict['completions'][j])
        individualDict['passAttempts'].append(newDict['passAttempts'][j])
        individualDict['passingYards'].append(newDict['passingYards'][j])
        individualDict['passingTouchdowns'].append(newDict['passingTouchdowns'][j])
        individualDict['interceptions'].append(newDict['interceptions'][j])
    if playerName != "":
      newDict['rank'].pop(popIndex)
      newDict['players'].pop(popIndex)
      newDict['completions'].pop(popIndex)
      newDict['passAttempts'].pop(popIndex)
      newDict['passingYards'].pop(popIndex)
      newDict['passingTouchdowns'].pop(popIndex)
      newDict['interceptions'].pop(popIndex)
      plotData.append(individualDict)
      plotData.append(rosterDict)
  elif position == 'RB':
    footballData = readCSV("data1/FantasyPros_Fantasy_Football_Statistics_RB.csv")
    plotData = []
    newDict = dict(rank = [], players = [], rushAttempts = [], rushYards = [], rushingYardsPerAttempt = [], longestRun = [], rushTouchdowns = [], receptions = [], targets = [], receivingYards = [], yardsPerReceptions = [], receivingTouchdowns = [], fumbles= [], gamesPlayed = [], totalFantasyPoints = [], fantasyPointsPerGame = [], rosterPercentage = [])
    individualDict = dict(rank = [], players = [], rushAttempts = [], rushYards = [], rushTouchdowns = [], receivingYards = [], receivingTouchdowns = [])
    rosterDict = dict(rosterPercent = [])

    for i in range(len(footballData)):
      if int(footballData[i]['Rank']) < 41:
        newDict['rank'].append(footballData[i]['Rank'])
        newDict['players'].append(footballData[i]['Player'])
        newDict['rushAttempts'].append(footballData[i]['Rush Attempts'])
        newDict['rushYards'].append(footballData[i]['Rushing Yards'])
        newDict['rushingYardsPerAttempt'].append(footballData[i]['Rushing Yards Per Attempt'])
        newDict['longestRun'].append(footballData[i]['Longest Run'])
        newDict['rushTouchdowns'].append(footballData[i]['Rushing Touchdowns'])
        newDict['receptions'].append(footballData[i]['Receptions'])
        newDict['targets'].append(footballData[i]['Targets'])
        newDict['receivingYards'].append(footballData[i]['Receiving Yards'])
        newDict['yardsPerReceptions'].append(footballData[i]['Yards Per Reception'])
        newDict['receivingTouchdowns'].append(footballData[i]['Receiving Touchdowns'])
        newDict['fumbles'].append(footballData[i]['Fumbles Lost'])
        newDict['gamesPlayed'].append(footballData[i]['Games Played'])
        newDict['totalFantasyPoints'].append(footballData[i]['Total Fantasy Points'])
        newDict['fantasyPointsPerGame'].append(footballData[i]['Fantasy Points Per Game'])
        newDict['rosterPercentage'].append(footballData[i]['Roster Percentage'])

    for j in range(len(newDict['players'])):
      if playerName == newDict['players'][j][0:len(playerName)]:
        popIndex = j

        rosterDict['rosterPercent'].append(newDict['rosterPercentage'][j])
        rosterDict['rosterPercent'][0] = rosterDict['rosterPercent'][0].replace("%", "")
        rosterDict['rosterPercent'][0] = float(rosterDict['rosterPercent'][0])
        notRostered = 100 - float(rosterDict['rosterPercent'][0])
        rosterDict['rosterPercent'].append(notRostered)

        individualDict['rank'].append(newDict['rank'][j])
        individualDict['players'].append(newDict['players'][j])
        individualDict['rushAttempts'].append(newDict['rushAttempts'][j])
        individualDict['rushYards'].append(newDict['rushYards'][j])
        individualDict['rushTouchdowns'].append(newDict['rushTouchdowns'][j])
        individualDict['receivingYards'].append(newDict['receivingYards'][j])
        individualDict['receivingTouchdowns'].append(newDict['receivingTouchdowns'][j])
    if playerName != "":
      newDict['rank'].pop(popIndex)
      newDict['players'].pop(popIndex)
      newDict['rushAttempts'].pop(popIndex)
      newDict['rushYards'].pop(popIndex)
      newDict['rushTouchdowns'].pop(popIndex)
      newDict['receivingYards'].pop(popIndex)
      newDict['receivingTouchdowns'].pop(popIndex)
      plotData.append(individualDict)
      plotData.append(rosterDict)

  elif position == 'WR':
    footballData = readCSV("data1/FantasyPros_Fantasy_Football_Statistics_WR.csv")
    plotData = []
    newDict = dict(rank = [], players = [], receptions = [], targets = [], receivingYards = [], yardsPerReception = [], longestReception = [], receivingTouchdowns = [], rushAttempts = [], rushYards = [], rushingTouchdowns = [], fumbles= [], gamesPlayed = [], totalFantasyPoints = [], fantasyPointsPerGame = [], rosterPercentage = [])
    individualDict = dict(rank = [], players = [], receptions = [], targets = [], receivingYards = [], longestReception = [], receivingTouchdowns = [])
    rosterDict = dict(rosterPercent = [])
 
    for i in range(len(footballData)):
      if int(footballData[i]['Rank']) < 61:
        newDict['rank'].append(footballData[i]['Rank'])
        newDict['players'].append(footballData[i]['Player'])
        newDict['receptions'].append(footballData[i]['Receptions'])
        newDict['targets'].append(footballData[i]['Targets'])
        newDict['receivingYards'].append(footballData[i]['Receiving Yards'])
        newDict['yardsPerReception'].append(footballData[i]['Yards Per Reception'])
        newDict['longestReception'].append(footballData[i]['Longest Reception'])
        newDict['receivingTouchdowns'].append(footballData[i]['Receiving Touchdowns'])
        newDict['rushAttempts'].append(footballData[i]['Rush Attempts'])
        newDict['rushYards'].append(footballData[i]['Rushing Yards'])
        newDict['rushingTouchdowns'].append(footballData[i]['Rushing Touchdowns'])
        newDict['fumbles'].append(footballData[i]['Fumbles Lost'])
        newDict['gamesPlayed'].append(footballData[i]['Games Played'])
        newDict['totalFantasyPoints'].append(footballData[i]['Total Fantasy Points'])
        newDict['fantasyPointsPerGame'].append(footballData[i]['Fantasy Points Per Game'])
        newDict['rosterPercentage'].append(footballData[i]['Roster Percentage'])

    for j in range(len(newDict['players'])):
      if playerName == newDict['players'][j][0:len(playerName)]:
        popIndex = j

        rosterDict['rosterPercent'].append(newDict['rosterPercentage'][j])
        rosterDict['rosterPercent'][0] = rosterDict['rosterPercent'][0].replace("%", "")
        rosterDict['rosterPercent'][0] = float(rosterDict['rosterPercent'][0])
        notRostered = 100 - float(rosterDict['rosterPercent'][0])
        rosterDict['rosterPercent'].append(notRostered)

        individualDict['rank'].append(newDict['rank'][j])
        individualDict['players'].append(newDict['players'][j])
        individualDict['receptions'].append(newDict['receptions'][j])
        individualDict['targets'].append(newDict['targets'][j])
        individualDict['receivingYards'].append(newDict['receivingYards'][j])
        individualDict['longestReception'].append(newDict['longestReception'][j])
        individualDict['receivingTouchdowns'].append(newDict['receivingTouchdowns'][j])
    if playerName != "":
      newDict['rank'].pop(popIndex)
      newDict['players'].pop(popIndex)
      newDict['receptions'].pop(popIndex)
      newDict['targets'].pop(popIndex)
      newDict['receivingYards'].pop(popIndex)
      newDict['longestReception'].pop(popIndex)
      newDict['receivingTouchdowns'].pop(popIndex)
      plotData.append(individualDict)
      plotData.append(rosterDict)
  elif position == 'TE':
    footballData = readCSV("data1/FantasyPros_Fantasy_Football_Statistics_TE.csv")
    plotData = []
    newDict = dict(rank = [], players = [], receptions = [], targets = [], receivingYards = [], yardsPerReception = [], longestReception = [], receivingTouchdowns = [], rushAttempts = [], rushYards = [], rushingTouchdowns = [], fumbles= [], gamesPlayed = [], totalFantasyPoints = [], fantasyPointsPerGame = [], rosterPercentage = [])
    individualDict = dict(rank = [], players = [], receptions = [], targets = [], receivingYards = [], longestReception = [], receivingTouchdowns = [])
    rosterDict = dict(rosterPercent = [])

    for i in range(len(footballData)):
      if int(footballData[i]['Rank']) < 41:
        newDict['rank'].append(footballData[i]['Rank'])
        newDict['players'].append(footballData[i]['Player'])
        newDict['receptions'].append(footballData[i]['Receptions'])
        newDict['targets'].append(footballData[i]['Targets'])
        newDict['receivingYards'].append(footballData[i]['Receiving Yards'])
        newDict['yardsPerReception'].append(footballData[i]['Yards Per Reception'])
        newDict['longestReception'].append(footballData[i]['Longest Reception'])
        newDict['receivingTouchdowns'].append(footballData[i]['Receiving Touchdowns'])
        newDict['rushAttempts'].append(footballData[i]['Rush Attempts'])
        newDict['rushYards'].append(footballData[i]['Rushing Yards'])
        newDict['rushingTouchdowns'].append(footballData[i]['Rushing Touchdowns'])
        newDict['fumbles'].append(footballData[i]['Fumbles Lost'])
        newDict['gamesPlayed'].append(footballData[i]['Games Played'])
        newDict['totalFantasyPoints'].append(footballData[i]['Total Fantasy Points'])
        newDict['fantasyPointsPerGame'].append(footballData[i]['Fantasy Points Per Game'])
        newDict['rosterPercentage'].append(footballData[i]['Roster Percentage'])

    for j in range(len(newDict['players'])):
      if playerName == newDict['players'][j][0:len(playerName)]:
        popIndex = j

        rosterDict['rosterPercent'].append(newDict['rosterPercentage'][j])
        rosterDict['rosterPercent'][0] = rosterDict['rosterPercent'][0].replace("%", "")
        rosterDict['rosterPercent'][0] = float(rosterDict['rosterPercent'][0])
        notRostered = 100 - float(rosterDict['rosterPercent'][0])
        rosterDict['rosterPercent'].append(notRostered)

        individualDict['rank'].append(newDict['rank'][j])
        individualDict['players'].append(newDict['players'][j])
        individualDict['receptions'].append(newDict['receptions'][j])
        individualDict['targets'].append(newDict['targets'][j])
        individualDict['receivingYards'].append(newDict['receivingYards'][j])
        individualDict['longestReception'].append(newDict['longestReception'][j])
        individualDict['receivingTouchdowns'].append(newDict['receivingTouchdowns'][j])
    if playerName != "":
      newDict['rank'].pop(popIndex)
      newDict['players'].pop(popIndex)
      newDict['receptions'].pop(popIndex)
      newDict['targets'].pop(popIndex)
      newDict['receivingYards'].pop(popIndex)
      newDict['longestReception'].pop(popIndex)
      newDict['receivingTouchdowns'].pop(popIndex)
      plotData.append(individualDict)
      plotData.append(rosterDict)
  plotData.insert(0, newDict)
  # print(plotData)
  return plotData

