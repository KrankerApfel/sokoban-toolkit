export class FileManager {
    constructor(
      private textarea: HTMLTextAreaElement,
      private fileInput: HTMLInputElement,
      private filenameInput: HTMLInputElement
    ) {}
  
    loadTextFromFile() {
      const file = this.fileInput.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (typeof e.target?.result === 'string') {
          this.textarea.value = e.target.result;
        }
      };
      reader.readAsText(file);
    }
  
    triggerFileDownload(content: string, filename: string = 'niveau.txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
  
      URL.revokeObjectURL(url);
    }
  
    clickFileInput() {
      this.fileInput.click();
    }
  }
  