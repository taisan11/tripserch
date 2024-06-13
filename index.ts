        // Web Workerの数を指定
        const NUM_WORKERS = 4;

        // Web Workerの配列
        const workers:Worker[] = [];
        let foundTrip = null;

        // メッセージハンドラ
        function handleMessage(event:any) {
            const { trip } = event.data;

            // "taisan11"が含まれるtripを探す
            if (trip.includes("taisan11")) {
                foundTrip = trip;
                console.log("Found trip:", trip);

                // すべてのWeb Workerを終了
                workers.forEach(worker => worker.terminate());
            }
        }

        // Web Workerの生成
        for (let i = 0; i < NUM_WORKERS; i++) {
            const worker = new Worker("./woker.ts");
            worker.onmessage = handleMessage;
            workers.push(worker);
        }

        // メインスレッドから各Web Workerにメッセージを送信
        workers.forEach(worker => worker.postMessage('start'));
        await Bun.sleep(999999999999999999999)