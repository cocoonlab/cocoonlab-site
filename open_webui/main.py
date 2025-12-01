"""FastAPI entrypoint wiring up CocoonLab routers."""

from fastapi import FastAPI

from . import models
from .database import engine
from .routers import cocoon_concepts

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CocoonLab WebUI", version="0.1.0")
app.include_router(cocoon_concepts.router)
