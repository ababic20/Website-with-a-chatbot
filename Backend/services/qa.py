from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain, ConversationChain
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
import os

memory_store = {}

def get_conversation_chain(db: FAISS, session_id: str):
    llm = ChatGroq(
        model="llama-3.1-8b-instant", 
        api_key=os.getenv("GROQ_API_KEY")
    )

    if session_id not in memory_store:
        memory_store[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
    memory = memory_store[session_id]

    if db and db.docstore._dict:
        retriever = db.as_retriever(search_kwargs={"k": 3})
        return ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever,
            memory=memory,
            verbose=True
        )
    else:
        return ConversationChain(
            llm=llm,
            memory=memory,
            verbose=True
        )
