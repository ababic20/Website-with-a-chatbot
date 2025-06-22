from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

def get_qa_chain(db):
    retriever = db.as_retriever()
    llm = ChatOpenAI(model="gpt-3.5-turbo-16k")
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
