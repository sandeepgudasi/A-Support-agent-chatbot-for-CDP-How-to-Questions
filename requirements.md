#i want to build a support agent chatbot for CDP "how-to" questions
 
 objectives 
  -Develop a chatbot that can answer "how-to" questions related to four CDPs: segment, mParticle, Lytics, and Zeotap. the chatbot should be able to extract relevent information from official docmentations of these CDP's to guide users on how to perform task pr achive specfic outcomes within each platform.
    -Data sources:
      -Segment documentation: https://segment.com/docs/?ref=nav
      -mParticle documentation: https://docs.mparticle.com/
      -Lytics documentation: https://docs.lytics.com/
      -Zeotap documentation: https://docs.zeotap.com/home/en-us/
    -chatbot should be able to handle user queries in natural language and extract the relevant information from the documentation.
    
## Core functionalities
 1. Answer "How-to" questions:
    -the chatbot shoukd be able to understand and respomd to user questions about how to perform specific tasks or use features within each CDPs.
    -Example of user queries:
      -"how do i set up a new source in segment?"
      -"How can i create a user profile in mParticle?"
      -"how do i build an audience segment in lytics?"
      -"How do i integrate my data with zeotap?"
 2. Extract information from documentation:
      -the chatbot should be able to extract relevant information from the provided documentation to answer user queries.
      -it should be able to navigate through the documentation, identity relevant sections, and extract necessary instructions or steps.
 3. handle variations in questions:
      -size variations. example extreamly long questions should not break it down.
      -questions irrelevant to CDP's example which movie is getting released next month.
 
### Bonus features
 1. when the user send clear chat message all the chat history should be deleted.
 2.cross-CDP Comparisons:
     -the chatbot can answer questions about the difference in approaches or functionality between the four CDPs.
     -Example Question: "How does segments audience creation process comare to lytics?"
3. Advanced "How-to" Questions:
     -the chatbot can handle more complex or platform-specific "how-to" questions.
     -it can provide guidance on advanced configurations, integrations, or use cases.

