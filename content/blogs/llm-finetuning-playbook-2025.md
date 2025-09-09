# Introduction

Fine-tuning LLMs has become a critical skill for AI practitioners. With methods like full fine-tuning, LoRA, and QLoRA, teams must balance efficiency, cost, and accuracy.

---

## Decision Matrix

| Method            | Best For                     | Pros                    | Cons                   |
|-------------------|------------------------------|-------------------------|------------------------|
| Full Fine-Tuning  | Large orgs, high accuracy    | High accuracy, domain adaptation | Expensive, resource heavy |
| LoRA              | Mid-size teams, cost-sensitive | Efficient, modular adapters | Sometimes less accurate |
| QLoRA             | Resource-constrained setups  | Low memory, fast experiments | Slight accuracy trade-offs |

---

## Minimal QLoRA Code Scaffold

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

model = AutoModelForCausalLM.from_pretrained("llama-7b", load_in_4bit=True)
tokenizer = AutoTokenizer.from_pretrained("llama-7b")

peft_config = LoraConfig(
    r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"], lora_dropout=0.05
)
model = get_peft_model(model, peft_config)
