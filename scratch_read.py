import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\hubsh\.gemini\antigravity\brain\e2f626f7-1a9c-44d5-b35d-839a3f84a2a2\.system_generated\logs\transcript.jsonl"
with open(path, "r", encoding="utf-8") as f:
    for line in f:
        data = json.loads(line)
        idx = data.get("step_index")
        if idx in range(770, 836):
            print(f"=== STEP {idx} ===")
            if "thinking" in data:
                print("THINKING:")
                print(data["thinking"])
            if "content" in data:
                print("CONTENT:")
                print(data["content"][:1000])
            print("\n" + "="*40 + "\n")
