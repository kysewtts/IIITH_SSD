from math import sqrt
from datetime import datetime
import sys

def readInput(num):
    # num = 1 for question1 and 2 for question2
    matrices = []
    l = []
    timeArr = []
    with open('input.txt', 'r') as f:
        row = []
        rowNum = 0
        for line in f:
            if len(line) != 1:
                line = line.strip()
                s = line.split('\t')
                t = s[0]
                s = s[1:]
                for idx, val in enumerate(s):
                    if val != '0':
                        row.append((rowNum, idx))
                    
                if(rowNum == 20):
                    # Taking the median of time
                    timeArr.append(t)
                rowNum += 1
            else:
                # This means that there was a line break
                matrices.append(row)
                row = []
                rowNum = 0
    if num == 2:
        # This means that question2 is being run
        # Can take [8, 9, 14] [8, 9, 15] [8, 9, 16]
        indices = [8, 9, 16]
        matrices = [ x for i, x in enumerate(matrices) if i in indices ]
        timeArr = [x for i, x in enumerate(timeArr) if i in indices]
    return (matrices, timeArr)

def performCalculation(matrices, timeArr):
    leftFoot = ()
    rightFoot = ()

    initialLeft = ()
    initialRight = ()
    initialTime = 0
    finalTime = 0

    distanceLeft = 0
    distanceRight = 0

    for (ir, row) in enumerate(matrices):
        for (ic, col) in enumerate(row):
            if len(leftFoot) == 0 and len(rightFoot) == 0 and len(row) != 0:
                leftFoot = col
                initialLeft = col
                initialTime = timeArr[ir]
                break
            elif len(leftFoot) != 0 and len(rightFoot) == 0 and col[0] != leftFoot[0]:
                rightFoot = col
                initialRight = col
                break
            # elif len(rightFoot) and col[0] not in range(rightFoot[0] - 3, rightFoot[0] + 4):
            elif len(rightFoot):
                if col[0] not in range(rightFoot[0] - 3, rightFoot[0] + 4):
                    distanceLeft += sqrt(((col[0] - leftFoot[0]) ** 2) + ((col[1] - leftFoot[1]) ** 2))
                    leftFoot = col
                    if finalTime == 0:
                        finalTime = timeArr[ir]
                else:
                    rightFoot = col
                break
            # elif len(leftFoot) and col[0] not in range(leftFoot[0] - 3, leftFoot[0] + 4):
            elif len(leftFoot):
                if col[0] not in range(leftFoot[0] - 3, leftFoot[0] + 4):
                    distanceRight += sqrt(((col[0] - rightFoot[0]) ** 2) + ((col[1] - rightFoot[1]) ** 2))
                    rightFoot = col
                else:
                    leftFoot = col
                break
            elif col[0] != 0:
                break

    print("Stride length is: ", distanceLeft)

    format = '%H:%M:%S.%f'

    a = datetime.strptime(finalTime, format)
    b = datetime.strptime(initialTime, format)
    c = (a - b).total_seconds()
    # 2 steps are taken in c seconds
    print("Stride velocity is: ", distanceLeft / c, "units")
    print("Cadence is: (steps / minute)", 120 / c)

def processArgs(args):
    questionNum = args[1]

    matrices = []
    timeArr = []

    if questionNum == "q1":
        matrices, timeArr = readInput(1)
    elif questionNum == "q2":
        matrices, timeArr = readInput(2)
    else:
        print('Invalid command.. Please try again')
        exit(0)

    performCalculation(matrices, timeArr)

if __name__ == "__main__":
    # processArgs
    if len(sys.argv) < 2:
        raise ValueError('Incorrect number of args')
    else:
        processArgs(sys.argv)