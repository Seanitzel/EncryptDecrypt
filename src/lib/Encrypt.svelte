<script>
  import {
    encrypt,
    decrypt,
    encryptBatch,
    decryptBatch,
  } from "../helpers/helpers";

  let key = "";
  let text = "";
  let batch = "";

  let isDecryptMode = true;

  $: result = isDecryptMode ? decrypt(key, text) : encrypt(key, text);
  $: batchResult = isDecryptMode
    ? decryptBatch(key, batch.split("\n"))
    : encryptBatch(key, batch.split("\n"));
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
    <div class="batch">
      <label for="batch">Batch</label>
      <textarea type="text" id="text" bind:value={batch} />
    </div>

    <p>Result: {result}</p>
    <p>Batch result:</p>
    {#if batchResult.length}
      {#each batchResult as email}
        <li>{email}</li>
      {/each}
    {/if}
  </div>
</div>

<style>
  input {
    font-size: 24px;
  }

  .batch {
    padding: 24px 0;
  }

  textarea {
    font-size: 24px;
    width: 100%;
    height: 200px;
  }
</style>
