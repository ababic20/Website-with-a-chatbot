from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain, ConversationChain
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import FAISS

memory_store = {}

def get_conversation_chain(db: FAISS, session_id: str):
    llm = ChatOpenAI(model="gpt-3.5-turbo-16k")

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
