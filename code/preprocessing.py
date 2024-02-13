import sys
import pandas as pd

#get file to process from command line
datafile = sys.argv[1]
#extract data from csv
df = pd.read_csv(datafile)

#create outfile for by-subject summary
outfile = open(datafile.replace(".csv", "") + "_break.txt", "w")
#create outfile for summarized data
sumfile = datafile.replace(".csv", "") + "_prep.csv"

#calculate number of subjects
n = int(len(df.index) / 20)
#create df for summary data
df_sum = pd.DataFrame({'trial': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'Tot'],
                        'asym_a': [0, 0, 0, 0, 0, 0, 0],
                        'asym_s': [0, 0, 0, 0, 0, 0, 0],
                        'sym': [0, 0, 0, 0, 0, 0, 0],
                        'total': [2*n, 2*n, 4*n, 4*n, 4*n, 4*n, 20*n]})
#create array for type and asym_type summary
types = [0, 0, 0, 0]
asym_types = [0, 0, 0, 0, 0, 0, 0, 0, 0]
asym_types_36 = [0, 0, 0, 0, 0, 0, 0, 0, 0]
maxes = [0, 0, 0, 0, 0, 0]
sym_maxes = [0, 0, 0, 0, 0, 0]
asym_maxes = [0, 0, 0, 0, 0, 0]
sym_totals = [0, 0, 0, 0, 0, 0]
asym_totals = [0, 0, 0, 0, 0, 0]

#loop through subjects
for i in range(0, n):
    #create new dataframe for each subject
    df_out = pd.DataFrame({'trial': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'Tot'],
                            'asym_a': [0, 0, 0, 0, 0, 0, 0],
                            'asym_s': [0, 0, 0, 0, 0, 0, 0],
                            'sym': [0, 0, 0, 0, 0, 0, 0],
                            'total': [2, 2, 4, 4, 4, 4, 20]})

    #write subject # to file
    subj = df['workerid'].iloc[i*20]
    meas_type = df['measurement_type'].iloc[i*20]
    print('participant ' + str(subj))
    outfile.write('participant ' + str(subj) + "\n")

    #loop through subject's items
    for j in range(i*20, i*20 + 20):
        #get trial type and response in variables
        tt = df.iloc[j]['trial_type']
        rsp = df['response'].iloc[j]

        #check measurement type and alternation to determine directionality
        if df['measurement_type'].iloc[j] == "Asym_A":
            if df['alternation'].iloc[j] == "A":
                #add to table if 'yes' response
                df_out.loc[df_out['trial'] == tt, 'asym_a'] += rsp
                #add to total regardless of response
                df_out.loc[df_out['trial'] == 'Tot', 'asym_a'] += 1
                #same for summary data
                df_sum.loc[df_sum['trial'] == tt, 'asym_a'] += rsp
                df_sum.loc[df_sum['trial'] == 'Tot', 'asym_a'] += 1

            elif df['alternation'].iloc[j] == "S":
                df_out.loc[df_out['trial'] == tt, 'asym_s'] += rsp
                df_out.loc[df_out['trial'] == 'Tot', 'asym_s'] += 1

                df_sum.loc[df_sum['trial'] == tt, 'asym_s'] += rsp
                df_sum.loc[df_sum['trial'] == 'Tot', 'asym_s'] += 1

        elif df['measurement_type'].iloc[j] == "Asym_S":
            if df['alternation'].iloc[j] == "A":
                df_out.loc[df_out['trial'] == tt, 'asym_s'] += rsp
                df_out.loc[df_out['trial'] == 'Tot', 'asym_s'] += 1

                df_sum.loc[df_sum['trial'] == tt, 'asym_s'] += rsp
                df_sum.loc[df_sum['trial'] == 'Tot', 'asym_s'] += 1

            if df['alternation'].iloc[j] == "S":
                df_out.loc[df_out['trial'] == tt, 'asym_a'] += rsp
                df_out.loc[df_out['trial'] == 'Tot', 'asym_a'] += 1

                df_sum.loc[df_sum['trial'] == tt, 'asym_a'] += rsp
                df_sum.loc[df_sum['trial'] == 'Tot', 'asym_a'] += 1

        elif df['measurement_type'].iloc[j] == "Sym":
            df_out.loc[df_out['trial'] == tt, 'sym'] += rsp
            df_out.loc[df_out['trial'] == 'Tot', 'sym'] += 1

            df_sum.loc[df_sum['trial'] == tt, 'sym'] += rsp
            df_sum.loc[df_sum['trial'] == 'Tot', 'sym'] += 1

        else:
            #error checking
            print(df.iloc[i])

    print(meas_type)
    #sum trial responses
    if meas_type == 'Sym':
        t1_total = df_out.loc[0,'sym']
        t2_total = df_out.loc[1,'sym']
        t3_total = df_out.loc[2,'sym']
        t4_total = df_out.loc[3,'sym']
        t5_total = df_out.loc[4,'sym']
        t6_total = df_out.loc[5,'sym']

        sym_totals[0] += t1_total
        sym_totals[1] += t2_total
        sym_totals[2] += t3_total
        sym_totals[3] += t4_total
        sym_totals[4] += t5_total
        sym_totals[5] += t6_total

        asym_type = 'N/A'

        if t1_total == 2:
            sym_maxes[0] += 1
        if t2_total == 2:
            sym_maxes[1] += 1
        if t3_total == 4:
            sym_maxes[2] += 1
        if t4_total == 4:
            sym_maxes[3] += 1
        if t5_total == 4:
            sym_maxes[4] += 1
        if t6_total == 4:
            sym_maxes[5] += 1

    elif meas_type == 'Asym_A' or 'Asym_S':
        t1_total = df_out.loc[0,'asym_a'] + df_out.loc[0,'asym_s']
        t2_total = df_out.loc[1,'asym_a'] + df_out.loc[1,'asym_s']
        t3_total = df_out.loc[2,'asym_a'] + df_out.loc[2,'asym_s']
        t4_total = df_out.loc[3,'asym_a'] + df_out.loc[3,'asym_s']
        t5_total = df_out.loc[4,'asym_a'] + df_out.loc[4,'asym_s']
        t6_total = df_out.loc[5,'asym_a'] + df_out.loc[5,'asym_s']

        asym_totals[0] += t1_total
        asym_totals[1] += t2_total
        asym_totals[2] += t3_total
        asym_totals[3] += t4_total
        asym_totals[4] += t5_total
        asym_totals[5] += t6_total

        if t1_total == 2:
            asym_maxes[0] += 1
        if t2_total == 2:
            asym_maxes[1] += 1
        if t3_total == 4:
            asym_maxes[2] += 1
        if t4_total == 4:
            asym_maxes[3] += 1
        if t5_total == 4:
            asym_maxes[4] += 1
        if t6_total == 4:
            asym_maxes[5] += 1


        #check asymmetry on T4 and T5
        if df_out.loc[3,'asym_a'] > df_out.loc[3,'asym_s']:
            if df_out.loc[4,'asym_a'] > df_out.loc[4,'asym_s']:
                asym_type = 'Top Left'
                asym_types[0] += 1
            elif df_out.loc[4,'asym_a'] == df_out.loc[4,'asym_s']:
                    asym_type = 'Top Mid'
                    asym_types[1] += 1
            else:
                asym_type = 'Top Right'
                asym_types[2] += 1
        elif df_out.loc[3,'asym_a'] == df_out.loc[3,'asym_s']:
            if df_out.loc[4,'asym_a'] > df_out.loc[4,'asym_s']:
                asym_type = 'Mid Left'
                asym_types[3] += 1
            elif df_out.loc[4,'asym_a'] == df_out.loc[4,'asym_s']:
                asym_type = 'Mid Mid'
                asym_types[4] += 1
            else:
                asym_type = 'Mid Right'
                asym_types[5] += 1
        else:
            if df_out.loc[4,'asym_a'] > df_out.loc[4,'asym_s']:
                asym_type = 'Bot Left'
                asym_types[6] += 1
            elif df_out.loc[4,'asym_a'] == df_out.loc[4,'asym_s']:
                asym_type = 'Bot Mid'
                asym_types[7] += 1
            else:
                asym_type = 'Bot Right'
                asym_types[8] += 1

        #check asymmetry on T3 and T6
        if df_out.loc[2,'asym_a'] > df_out.loc[2,'asym_s']:
            if df_out.loc[5,'asym_a'] > df_out.loc[5,'asym_s']:
                asym_type_36 = 'Top Left'
                asym_types_36[0] += 1
            elif df_out.loc[5,'asym_a'] == df_out.loc[5,'asym_s']:
                    asym_type_36 = 'Top Mid'
                    asym_types_36[1] += 1
            else:
                asym_type_36 = 'Top Right'
                asym_types_36[2] += 1
        elif df_out.loc[2,'asym_a'] == df_out.loc[2,'asym_s']:
            if df_out.loc[5,'asym_a'] > df_out.loc[5,'asym_s']:
                asym_type_36 = 'Mid Left'
                asym_types_36[3] += 1
            elif df_out.loc[5,'asym_a'] == df_out.loc[5,'asym_s']:
                asym_type_36 = 'Mid Mid'
                asym_types_36[4] += 1
            else:
                asym_type_36 = 'Mid Right'
                asym_types_36[5] += 1
        else:
            if df_out.loc[5,'asym_a'] > df_out.loc[5,'asym_s']:
                asym_type_36 = 'Bot Left'
                asym_types_36[6] += 1
            elif df_out.loc[5,'asym_a'] == df_out.loc[5,'asym_s']:
                asym_type_36 = 'Bot Mid'
                asym_types_36[7] += 1
            else:
                asym_type_36 = 'Bot Right'
                asym_types_36[8] += 1

    #check exclusion criteria
    if t1_total == 0:
        if t2_total == 0:
            exclude = True
        elif t2_total == 1:
            exclude = True
        elif t2_total == 2:
            exclude = False
    elif t1_total == 1:
        exclude = True
    elif t1_total == 2:
        exclude = True

    #categorize participants by type based on overall T3/T6 responses
    if t3_total > 3:
        if t6_total > 3:
            participant_type = 0
        else:
            participant_type = 2
    else:
        if t6_total > 3:
            participant_type = 1
        else:
            participant_type = 3

    #check max values
    if t1_total == 2:
        maxes[0] += 1
    if t2_total == 2:
        maxes[1] += 1
    if t3_total == 4:
        maxes[2] += 1
    if t4_total == 4:
        maxes[3] += 1
    if t5_total == 4:
        maxes[4] += 1
    if t6_total == 4:
        maxes[5] += 1

    #print and write exclusion criteria and participant type
    print('exclude - ' + str(exclude))
    outfile.write('exclude - ' + str(exclude) + "\n")
    print('type ' + str(participant_type + 1))
    outfile.write('type ' + str(participant_type + 1) + "\n")
    print('asym_type - ' + str(asym_type))
    outfile.write('asym_type ' + str(asym_type) + "\n")
    types[participant_type] += 1

    #print and write subject data
    print(df_out)
    outfile.write(df_out.to_string() + "\n\n")

#print and write type summary
print('type summary: ')
print(types)
outfile.write('type summary: ' + str(types) + "\n")

print('asym_type summary: ')
print(asym_types)
outfile.write('asym_type summary: ' + str(asym_types) + "\n")

print('asym_type_36 summary: ')
print(asym_types_36)
outfile.write('asym_type_36 summary: ' + str(asym_types_36) + "\n")

print('maxes: ')
print(maxes)
outfile.write('maxes: ' + str(maxes) + "\n")

print('sym_maxes: ')
print(sym_maxes)
outfile.write('sym_maxes: ' + str(sym_maxes) + "\n")

print('asym_maxes: ')
print(asym_maxes)
outfile.write('asym_maxes: ' + str(asym_maxes) + "\n")

print('sym_totals: ')
print(sym_totals)
outfile.write('sym_totals: ' + str(sym_maxes) + "\n")

print('asym_totals: ')
print(asym_totals)
outfile.write('asym_totals: ' + str(asym_maxes) + "\n")

#write summary data to summary file
df_sum.to_csv(sumfile)
#close outfile
outfile.close()
