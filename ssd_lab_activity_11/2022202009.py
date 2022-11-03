import csv
from statistics import mean

inpChar = input('Enter any character from A-Z: ')

fileName = 'lab_11_data.csv'
avgOutputFileName = 'avg_output.txt'
stockOutputFileName = 'stock_output.txt'
# fields = ['Symbol','Open','High','Low','LTP','Chng','% Chng','Volume (lacs)','Turnover (crs.)','52w H','52w L','365 d % chng','30 d % chng']
avgOutputField=[]
stockOutputField = ['Symbol','Open','High','Low','LTP','Chng','% Chng']
fields = []

lambdaDropCol = lambda data: data[0: 7]
lambdaFun = lambda data: float(data[6]) > -3
lambdaOpen = lambda data: float(data[1].replace(',', ''))
lambdaHigh = lambda data: float(data[2].replace(',', ''))
lambdaLow = lambda data: float(data[3].replace(',', ''))
lambdaStartChar = lambda data: data[0][0] == inpChar

tempDropCol = []
with open(fileName, 'r') as f:
    reader = csv.reader(f)
    fields = next(reader)
    for row in reader:
        tempDropCol.append(lambdaDropCol(row))

tempDroppedNegRows = list(filter(lambdaFun, tempDropCol))

openVal = list(map(lambdaOpen, tempDroppedNegRows))
highVal = list(map(lambdaHigh, tempDroppedNegRows))
lowVal = list(map(lambdaLow, tempDroppedNegRows))

avgOpen, avgHigh, avgLow = mean(openVal), mean(highVal), mean(lowVal)

filterWithStartChar = list(filter(lambdaStartChar, tempDroppedNegRows))

with open(avgOutputFileName, 'w', encoding = 'utf8') as csvFile:
    openAvg = str(avgOpen) + '\n'
    highAvg = str(avgHigh) + '\n'
    lowAvg = str(avgLow) + '\n'
    csvFile.write(openAvg)
    csvFile.write(highAvg)
    csvFile.write(lowAvg)

with open(stockOutputFileName, 'w', newline = '', encoding = 'utf8') as csvFile:
    for row in filterWithStartChar:
        s = ' '.join(row)
        s += '\n'
        csvFile.write(s)
