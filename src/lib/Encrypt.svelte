<script>
  import { encrypt, decrypt } from "../helpers/helpers";

  let key = "";
  let text = "";

  let isDecryptMode = true;

  $: result = isDecryptMode ? decrypt(key, text) : encrypt(key, text);
</script>

<div>
  <h3>
    Mode: {isDecryptMode ? "Decrypt" : "Encrypt"}
  </h3>
  <div>
    <button on:click={() => (isDecryptMode = !isDecryptMode)}>
      Switch Mode
    </button>
  </div>
  <div style="padding: 24px 0;">
    <label for="key">Key</label>
    <input type="text" id="key" bind:value={key} />

    <label for="text">Text</label>
    <input type="text" id="text" bind:value={text} />

    <p>Result: {result}</p> 
  </div>
</div>

<style>
  input {
    font-size: 24px;
  }
</style>