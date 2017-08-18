import os
import sys

strin = "import * as actions from './action'\nimport reducer from './reducer'\nimport view from './views/content'\nexport {actions, reducer, view};"

os.mkdir('./app/src/%s'% sys.argv[1])
os.mkdir('./app/src/%s/views'% sys.argv[1])
os.system('touch ./app/src/%s/action.js'%sys.argv[1])
os.system('touch ./app/src/%s/reducer.js'%sys.argv[1])
os.system('touch ./app/src/%s/index.js'%sys.argv[1])