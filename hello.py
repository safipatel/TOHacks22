"""
A sample Hello World server.
"""
import os, json

from flask import Flask, render_template, request,jsonify
import cohere
from cohere.classify import Example
co = cohere.Client('tWhWUq5LcncptIW4ge2JtClGaH530WpFqkOOvreP') #cohere.Client('9vp3fPPM106DiABwvyvdY0mgi8yXPifQjM08boui')




# pylint: disable=C0103
app = Flask(__name__)


@app.route('/',methods = ['GET','POST'])
def index():

    """Return a friendly HTTP greeting."""

    """Get Cloud Run environment variables."""
    service = os.environ.get('K_SERVICE', 'Unknown service')
    revision = os.environ.get('K_REVISION', 'Unknown revision')
    
    if request.method == 'POST':
        m = json.loads(request.data, strict=False)
        content = m.get("content")
        id = m.get("id")
        responseMessage = "none"
        success = False
        if id == 0:
            success, responseMessage = intro(content)
        elif id == 1:
            success, responseMessage = topic(content)
        elif id == 2:
            success, responseMessage = question(content)
        
        id += 1
        if not success:
                id = 3;
        return jsonify(message = responseMessage,id = id);
    else:
        return render_template("index.html");

def intro(userRes): # CLASSIFY YES/NO
  classifications = co.classify(
    model='medium',
    taskDescription='',
    outputIndicator='',
    inputs=[userRes],
    examples=[Example("I\'m a little busy right now", "No"), Example("I don\'t want to", "No"), Example("No", "No"), Example("I have better things to do", "No"), Example("I\'d rather not", "No"), Example("Definitely! I would love to", "Yes"), Example("For sure, let\'s talk more", "Yes"), Example("Of course I love deep talks", "Yes"), Example("Yes", "Yes"), Example("Wow! I couldn\'t ask for anything more", "Yes")])


  if classifications.classifications[0].prediction == "Yes":
    return (True, "Which topic do you want to talk about?")
  else:
    return (False, "Sorry to see you go. As a corgi myself, I would love it if you REFRESHed and talked about the ENVIRONMENT with me!")
  
def topic(userRes): # CLASSIFY TOPIC
  classifications = co.classify(
    model='medium',
    taskDescription='',
    outputIndicator='',
    inputs=[userRes],
    examples=[Example("Money Money Money!", "Economical"), Example("Stocks are crazy right now", "Economical"), Example("Have you seen the markets lately", "Economical"), Example("Did you hear about the twitter buyout", "Economical"), Example("Inflation is crazy right now", "Economical"), Example("Which stocks should i look out for", "Economical"), Example("Economical", "Economical"), Example("I got to save the planet!", "Environmental"), Example("I wish people cared more about wildlife", "Environmental"), Example("Mother Nature is an underrated topic", "Environmental"), Example("Global warming is real", "Environmental"), Example("Climate Change is a serious issue", "Environmental"), Example("Environment", "Environmental"), Example("I love politics", "Politics"), Example("I didn\'t vote for nothing", "Politics"), Example("I heard the elections are going on", "Politics"), Example("Who are you going to vote for?", "Politics"), Example("Did you hear that party\'s new plan?", "Politics"), Example("Politics", "Politics")])
  
  choice = classifications.classifications[0].prediction

  if choice == "Politics":
    return (False, "Politics is so momentary. As a corgi myself, I would love it if you REFRESHed the page and talked about our timeless ENVIRONMENT with me! ")
  elif choice == "Economical":
    return (False, "Money is so momentary. As a corgi myself, I would love it if you REFRESHed the page and talked about our timeless ENVIRONMENT with me!")
  else:
    return (True, "What's one sustainability issue you struggle with and would like to learn more about?" )

def question(userRes): # CLASSIFY BIODIVERSITY/EMISSION REDUCTION/RECYCLING 
  classifications = co.classify( 
    model='medium', 
    taskDescription='The following sorts user responses about environmental issues into categories', 
    outputIndicator='', 
    inputs=[userRes],
    examples=[Example("I don\'t eat my veggies", "Biodiversity"), Example("I wear fast fashion", "Biodiversity"), Example("I hunt endangered species", "Biodiversity"), Example("I don\'t finish my food and always toss my leftovers", "Biodiversity"), Example("I use too many tissues", "Biodiversity"), Example("I released my goldfish into the wild", "Biodiversity"), Example("I always get take out", "Biodiversity"), Example("I turn species extinct", "Biodiversity"), Example("I drive a gas powered car", "Emission Reduction"), Example("I leave the lights on when I leave the room", "Emission Reduction"), Example("I take 1 hour showers", "Emission Reduction"), Example("I go on long drives as a coping mechanism", "Emission Reduction"), Example("My A/C is always on", "Emission Reduction"), Example("I drive instead of walk or carpool", "Emission Reduction"), Example("I don\'t unplug my electronics when they\'re finished charging", "Emission Reduction"), Example("I drive my car alone", "Emission Reduction"), Example("I built a nuclear powerplant", "Emission Reduction"), Example("I hate public transportation", "Emission Reduction"), Example("I want to reduce my carbon emissions", "Emission Reduction"), Example("I\'m contributing to climate change", "Emission Reduction"), Example("I emit a lot of carbon emissions", "Emission Reduction"), Example("I produce a lot of methane", "Emission Reduction"), Example("I use a lot of fertilizer", "Emission Reduction"), Example("I don\'t know the difference between recycling and garbage", "Recycling"), Example("I put my gum under the table", "Recycling"), Example("I never keep trash in my pockets", "Recycling"), Example("I don\'t separate my trash", "Recycling"), Example("I pour my oil down the drain", "Recycling"), Example("I buy single use plastics", "Recycling"), Example("I buy plastic water bottles instead of using a reusable one", "Recycling"), Example("I use plastic straws", "Recycling"), Example("I toss my electronics and batteries into the garbage", "Recycling"), Example("I always use plastic bags when grocery shopping", "Recycling"), Example("I buy things that I don\'t need", "Recycling"), Example("I use paper documents", "Recycling"), Example("I don\'t recycle", "Recycling")]) 

  fileName = ""

  choice = classifications.classifications[0].prediction
  print("SHOWING RESULTS FOR:", choice) 
  pass1 = ""
  
  with open('recyclingt.txt', encoding="utf-8") as f:
    pass1 = f.read()
    
  if choice == "Biodiversity":
    fileName = "biodiversity.txt"
  elif choice == "Emission Reduction":
    fileName = "emissions.txt"
  elif choice == "Recycling":
    fileName = "recycling.txt"

  pass2 = ""
  with open(fileName, encoding="utf-8") as f:
      pass2 = f.read()

  p =   "This program will generate a numbered list of tips from the passage.\n--Passage:" + pass1 + "\n\nTLDR: 1. No bags. Like really, no bags.\n2. Small things are big problems.\n3. Make sure it’s clean, empty and dry\n4. Combined materials are trash\n5. Know your plastics\n6. Stop wishcycling\n7. Teach yourself\n--\nPassage:" + pass2 + "\n\nTLDR:";

  prediction = co.generate(
    model='xlarge', 
    prompt= p,
      max_tokens=150, 
    temperature=0.3, 
    k=0, 
    p=1, 
    frequency_penalty=0.1, 
    presence_penalty=0, 
    stop_sequences=["--"], 
    return_likelihoods='NONE')
  return (True, "Here are some tips to address the negative impacts of that:\n" + '\n'.join(prediction.generations[0].text.split('\n')[:-1]))



if __name__ == '__main__':
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=False, port=server_port, host='0.0.0.0')
