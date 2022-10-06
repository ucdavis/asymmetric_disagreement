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

#loop through subjects
for i in range(0, n):
    #create new dataframe for each subject
    df_out = pd.DataFrame({'trial': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'Tot'],
                            'asym_a': [0, 0, 0, 0, 0, 0, 0],
                            'asym_s': [0, 0, 0, 0, 0, 0, 0],
                            'sym': [0, 0, 0, 0, 0, 0, 0],
                            'total': [2, 2, 4, 4, 4, 4, 20]})

    #write subject # to file
    subj = df.iloc[i*20]['workerid']
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

    #write subject data to outfile
    print(df_out)
    outfile.write(df_out.to_string() + "\n\n")

#write summary data to summary file
df_sum.to_csv(sumfile)
#close outfile
outfile.close()
