import json
import sys

def open_questions_file():
    questions = []
    with open("questions.txt",'r+') as f:
        for line in f:
            questions.append(line.strip())
    return questions

def open_choices_file():
    question2choices = []
    with open("choices.txt","r+") as f:
        choices = []
        for line in f:
            line = line.strip()
            if(line == '---'):
                question2choices.append(choices)
                choices = []
            else:
                choices.append(line)
    return question2choices

def open_solutions_file():
    solutions = []
    with open('solutions.txt','r+') as f:
        for line in f:
            line = line.strip()
            solutions.append(line)
    return solutions

def prep_data(questions,choices,solutions):
    assert (len(questions) == len(choices)),"[ASSERT FAILED]: Ensure questions, choices, solutions arrays are same size!"
    assert (len(choices) == len(solutions)),"[ASSERT FAILED]: Ensure questions, choices, solutions arrays are same size!"
    
    data = {"questions":[]}
    for idx,q in enumerate(questions):
        question = {}
        question['question'] = questions[idx]
        question['choices'] = choices[idx]
        question['solution'] = solutions[idx]
        data["questions"].append(question)
    return data

def output_json(data):
    json_struct = json.dumps(data, sort_keys=False, indent=4)
    file = open("data.json","w+")
    sys.stdout = file
    print(json_struct)
    sys.stdout = sys.__stdout__
    file.close()
    print("[DONE]: Successfully generated JSON file!")

def main():
    # open and fill arrays with questions,choices,and sols data
    questions = open_questions_file()
    q2c = open_choices_file()
    solutions = open_solutions_file()

    # populate the dict
    data = prep_data(questions=questions,choices=q2c,solutions=solutions)
    # dict -> JSON
    output_json(data)

if __name__ == '__main__':
    main()